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

        public async Task Run(string hostname, string clientId, EventHandler callback, string[] topics = null, QoS qoS = QoS.AcknowledgeDelivery)
        {
            client = new MQTTClient(hostname);

            client.Connected += callback;
            client.MessageReceived += Client_MessageReceived;

            await client.ConnectAsync(clientId);
        }
        
        /// <summary>
        /// 
        /// </summary>
        /// <param name="topic"></param>
        /// <param name="handler">string topic, string station, string subtopic, Data data</param>
        public void Subscribe(string topic, Func<string, string, string, Data, Task> handler, bool station = false, QoS qoS = QoS.AssureDelivery)
        {
            if (station == true)
                topic = "station/+/" + topic;

            client.Subscriptions.Add(topic, qoS);
            handlers.Add(topic, handler);
        }

        public async Task Publish(string topic, Data data, string station = null, QoS qoS = QoS.AssureDelivery, bool retain = false)
        {
            if (client == null)
                return;

            if (station != null)
                topic = "station/" + station + "/" + topic;

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
            if (!topic.StartsWith("station/"))
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
