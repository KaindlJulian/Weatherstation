using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using uPLibrary.Networking.M2Mqtt;
using uPLibrary.Networking.M2Mqtt.Messages;

namespace WeatherstationClient
{
    public class Mqtt
    {
        Dictionary<string, Func<string, string, string, Data, Task>> handlers = new Dictionary<string, Func<string, string, string, Data, Task>>();
        private MqttClient client;

        public void Run(string hostname, int port, string clientId, string user, string password)
        {
            client = new MqttClient(hostname, port, true, MqttSslProtocols.TLSv1_2
                , null, null);

            client.MqttMsgPublishReceived += Client_MessageReceived;

            client.Connect(clientId, user, password);
        }

        public void Close()
        {
            if(client != null && client.IsConnected)
                client.Disconnect();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="topic"></param>
        /// <param name="handler">string topic, string station, string subtopic, Data data</param>
        public void Subscribe(string topic, Func<string, string, string, Data, Task> handler, bool station = false, byte qos = MqttMsgBase.QOS_LEVEL_AT_LEAST_ONCE)
        {
            handlers.Add(topic, handler);

            if (station == true)
                topic = "station/+/" + topic;

            client.Subscribe(new string[] { topic }, new byte[] { qos });
        }

        public async Task Publish(string topic, Data data, string station = null, bool retain = false, byte qos = MqttMsgBase.QOS_LEVEL_AT_LEAST_ONCE)
        {
            if (client == null)
                return;

            if (station != null)
                topic = "station/" + station + "/" + topic;

            client.Publish(topic, Encoding.Default.GetBytes(JsonConvert.SerializeObject(data)), qos, retain);
        }

        private void Client_MessageReceived(object sender, MqttMsgPublishEventArgs e)
        {
            string topic = e.Topic;
            byte[] payload = e.Message;

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
            catch (Exception ex)
            {
                Console.WriteLine("An error occured during handler execution!");
                Console.WriteLine(ex);
            }
        }

        private (string station, string subtopic) ParseTopic(string topic)
        {
            if (!topic.StartsWith("station/"))
                return (null, topic);

            topic = topic.Substring(8);
            string station = topic.Remove(topic.IndexOf('/'));
            topic = topic.Substring(station.Length + 1);

            return (station, topic);
        }

        private Data ParsePayload(byte[] payload)
        {
            return JsonConvert.DeserializeObject<Data>(Encoding.Default.GetString(payload));
        }
    }
}
