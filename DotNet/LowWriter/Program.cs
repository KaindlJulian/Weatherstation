using System;
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
            StartMqtt();
            Console.WriteLine("Press enter to exit");
            Console.ReadKey();
        }

        static void StartMqtt()
        {
            Mqtt mqtt = new Mqtt();
            mqtt.Run("localhost", "LogWriter");
            mqtt.Subscribe("temperature", Temperature, true);
        }

        private static Task Temperature(string topic, string station, string subtopic, Data data)
        {
            if (station == null)
                return Task.CompletedTask;

            Console.WriteLine($"Station {station} has temperature {(double)data.Value}");

            return Task.CompletedTask;
        }
    }
}
