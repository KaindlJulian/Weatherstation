using Newtonsoft.Json;
using OpenNETCF.MQTT;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace WeatherstationClient
{
    public class Mqtt
    {
        private Dictionary<string, Func<string, string, string, Data, Task>> handlers = new Dictionary<string, Func<string, string, string, Data, Task>>();
        private MQTTClient client;

        public async Task<bool> Run(string hostname, string clientId, string[] topics = null, QoS qoS = QoS.AcknowledgeDelivery)
        {
            client = new MQTTClient(hostname);
            await client.ConnectAsync(clientId);
            if (!client.IsConnected)
            {
                return false;
            }

            client.MessageReceived += Client_MessageReceived;
            if(topics != null)
            {
                foreach (string topic in topics)
                {
                    client.Subscriptions.Add(topic, qoS);
                }
            }

            return true;
        }
        
        /// <summary>
        /// 
        /// </summary>
        /// <param name="topic"></param>
        /// <param name="handler">string topic, string station, string subtopic, Data data</param>
        public void Subscribe(string topic, Func<string, string, string, Data, Task> handler, QoS qoS = QoS.AssureDelivery)
        {
            client.Subscriptions.Add(topic, qoS);
            handlers.Add(topic, handler);
        }

        public async Task Publish(string topic, Data data, QoS qoS = QoS.AssureDelivery, bool retain = false)
        {
            if (client == null)
                return;

            await client.PublishAsync(topic, JsonConvert.SerializeObject(data), qoS, retain);
        }

        private void Client_MessageReceived(string topic, QoS qos, byte[] payload)
        {
            var (station, subtopic) = ParseTopic(topic);
            Data data = ParsePayload(payload);

            if (!handlers.ContainsKey(subtopic))
            { 
                Console.WriteLine("Received unknown topic: " + topic);
                return;
            }

            try
            {
                handlers[subtopic](topic, station, subtopic, data);
            }
            catch(Exception ex)
            {
                Console.WriteLine("An error occured during handler execution!");
                Console.WriteLine(ex);
            }
        }

        private (string station, string subtopic) ParseTopic(string topic)
        {
            if (!topic.StartsWith("/station/"))
                return (null, topic);

            topic = topic.Substring(9);
            string station = topic.Substring(topic.IndexOf('/'));
            topic = topic.Substring(station.Length);

            return (station, topic);
        }

        private Data ParsePayload(byte[] payload)
        {
            return JsonConvert.DeserializeObject<Data>(Encoding.Default.GetString(payload));
        }
    }
}
