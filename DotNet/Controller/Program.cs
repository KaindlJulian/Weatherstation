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
            "/station/<name>/air/toxicity",
            "/station/<name>/wind/strength"
        };

        static Mqtt mqtt;


        static void Main(string[] args)
        {
            MainAsync(args).Wait();
        }

        static async Task MainAsync(string[] args)
        {
            mqtt = new Mqtt();
            await mqtt.Run("localhost", "LogWriter", TOPICS, QoS.AssureDelivery);

            mqtt.Subscribe("/air/toxicity", Toxicity);
            mqtt.Subscribe("/wind/strength", WindStrength);
        }

        private static async Task WindStrength(string topic, string station, string subtopic, Data data)
        {
            if (data.Value == null)
                return;

            double wind = (double)data.Value;

            if (wind > 50)
                await mqtt.Publish("/warning/wind/on", new Data(wind), QoS.AssureDelivery, true);
            else
                await mqtt.Publish("/warning/wind/off", new Data(wind), QoS.AssureDelivery, true);
        }

        private static async Task Toxicity(string topic, string station, string subtopic, Data data)
        {
            if (data.Value == null)
                return;

            double toxicity = (double)data.Value;

            if (toxicity > 50)
                await mqtt.Publish("/warning/toxicity/on", new Data(toxicity), QoS.AssureDelivery, true);
            else
                await mqtt.Publish("/warning/toxicity/off", new Data(toxicity), QoS.AssureDelivery, true);
        }
    }
}
