using Newtonsoft.Json;
using OpenNETCF.MQTT;
using System;
using System.Threading;
using System.Threading.Tasks;
using WeatherstationClient;

namespace LogWriter
{
    class Program
    {
        static readonly string[] TOPICS = new[]
        {
            "/station/<name>/temperature",
            "/station/<name>/air/pressure",
            "/station/<name>/air/purity",
            "/station/<name>/air/toxicity",
            "/station/<name>/air/humidity",
            "/station/<name>/wind/direction",
            "/station/<name>/wind/strength",
            "/station/<name>/precipitation/type",
            "/station/<name>/precipitation/amount"
        };
        

        static void Main(string[] args)
        {
            MainAsync(args).Wait();
        }

        static async Task MainAsync(string[] args)
        {
            Mqtt mqtt = new Mqtt();
            await mqtt.Run("localhost", "LogWriter", TOPICS, QoS.AssureDelivery);

            mqtt.Subscribe("/temperature", Temperature);
        }

        private static Task Temperature(string topic, string station, string subtopic, Data data)
        {
            if (station == null)
                return Task.CompletedTask;

            Console.WriteLine($"Station {station} has temperature {(int)data.Value}");

            return Task.CompletedTask;
        }
    }
}
