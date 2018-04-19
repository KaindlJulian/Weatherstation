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
            "station/+/temperature",
            "station/+/air/pressure",
            "station/+/air/purity",
            "station/+/air/toxicity",
            "station/+/air/humidity",
            "station/+/wind/direction",
            "station/+/wind/strength",
            "station/+/precipitation/type",
            "station/+/precipitation/amount"
        };
        

        static void Main(string[] args)
        {
            MainAsync(args).Wait();
            Console.WriteLine("Press enter to exit");
            Console.ReadKey();
        }

        static async Task MainAsync(string[] args)
        {
            Mqtt mqtt = new Mqtt();
            await mqtt.Run("localhost", "LogWriter", (sender, e) =>
            {
                mqtt.Subscribe("temperature", Temperature, true);
            }, TOPICS, QoS.AssureDelivery);
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
