using OpenNETCF.MQTT;
using System;
using System.Threading.Tasks;
using WeatherstationClient;

namespace Controller
{
    class Program
    {
        static readonly string[] TOPICS = new[]
        {
            "station/+/air/toxicity",
            "station/+/wind/strength"
        };

        static Mqtt mqtt;


        static void Main(string[] args)
        {
            MainAsync(args).Wait();
            Console.WriteLine("Press enter to continue");
            Console.ReadKey();

            mqtt.Publish("temperature", new Data(13.5d), "StationA").Wait();

            Console.WriteLine("Press enter to exit");
            Console.ReadKey();
        }

        static async Task MainAsync(string[] args)
        {
            mqtt = new Mqtt();
            await mqtt.Run("localhost", "Controller", (sender, e) =>
            {
                mqtt.Subscribe("air/toxicity", Toxicity, true);
                mqtt.Subscribe("wind/strength", WindStrength, true);
            }, TOPICS, QoS.AssureDelivery);
        }

        private static async Task WindStrength(string topic, string station, string subtopic, Data data)
        {
            if (data.Value == null)
                return;

            double wind = (double)data.Value;

            if (wind > 50)
                await mqtt.Publish("warning/wind/on", new Data(wind), null, QoS.AssureDelivery, true);
            else
                await mqtt.Publish("warning/wind/off", new Data(wind), null, QoS.AssureDelivery, true);
        }

        private static async Task Toxicity(string topic, string station, string subtopic, Data data)
        {
            if (data.Value == null)
                return;

            double toxicity = (double)data.Value;

            if (toxicity > 50)
                await mqtt.Publish("warning/toxicity/on", new Data(toxicity), null, QoS.AssureDelivery, true);
            else
                await mqtt.Publish("warning/toxicity/off", new Data(toxicity), null, QoS.AssureDelivery, true);
        }
    }
}
