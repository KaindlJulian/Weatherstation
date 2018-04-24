using System;
using System.Threading.Tasks;
using WeatherstationClient;

namespace Controller
{
    class Program
    {
        static Mqtt mqtt;


        static void Main(string[] args)
        {
            StartMqtt();
            Console.WriteLine("Press enter to continue");
            Console.ReadKey();

            mqtt.Publish("temperature", new Data(13.5d), "StationA").Wait();

            Console.WriteLine("Press enter to exit");
            Console.ReadKey();
        }

        static void StartMqtt()
        {
            mqtt = new Mqtt();
            mqtt.Run("localhost", "Controller");
            mqtt.Subscribe("air/toxicity", Toxicity, true);
            mqtt.Subscribe("wind/strength", WindStrength, true);
        }

        private static async Task WindStrength(string topic, string station, string subtopic, Data data)
        {
            if (data.Value == null)
                return;

            double wind = (double)data.Value;

            if (wind > 50)
                await mqtt.Publish("warning/wind/on", new Data(wind), null, true);
            else
                await mqtt.Publish("warning/wind/off", new Data(wind), null, true);
        }

        private static async Task Toxicity(string topic, string station, string subtopic, Data data)
        {
            if (data.Value == null)
                return;

            double toxicity = (double)data.Value;

            if (toxicity > 50)
                await mqtt.Publish("warning/toxicity/on", new Data(toxicity), null, true);
            else
                await mqtt.Publish("warning/toxicity/off", new Data(toxicity), null, true);
        }
    }
}
