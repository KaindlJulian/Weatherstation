using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;
using WeatherstationClient;

namespace LogWriter
{
    class Program
    {
        static ApplicationDbContext dbContext = new ApplicationDbContext();
        static Mqtt mqtt = new Mqtt();

        static void Main(string[] args)
        {
            dbContext.Database.Migrate();

            StartMqtt();

            Console.WriteLine("Press enter to exit");
            Console.ReadKey();

            mqtt.Close();
        }

        static void StartMqtt()
        {
            mqtt.Run("localhost", "LogWriter");
            mqtt.Subscribe("temperature", Temperature, true);
            mqtt.Subscribe("air/pressure", AirPressure, true);
            mqtt.Subscribe("air/purity", AirPurity, true);
            mqtt.Subscribe("air/toxicity", AirToxicity, true);
            mqtt.Subscribe("air/humidity", AirHumidity, true);
            mqtt.Subscribe("wind/direction", WindDirection, true);
            mqtt.Subscribe("wind/strength", WindStrength, true);
            mqtt.Subscribe("precipitation/type", PrecipitationType, true);
            mqtt.Subscribe("precipitation/amount", PrecipitationAmount, true);
        }

        static (string topic, DateTime date)[] GetLifeDates(string subtopic)
        {
            return new[]
            {
                ($"life/{subtopic}/day", DateTime.Now.AddDays(-1)),
                ($"life/{subtopic}/month", DateTime.Now.AddMonths(-1)),
                ($"life/{subtopic}/year", DateTime.Now.AddYears(-1))
            };
        }

        private static async Task GenerateLifeData<T>(string subtopic, DbSet<T> dataSet) where T : BaseModel
        {
            var dates = GetLifeDates(subtopic);

            foreach (var (topic, date) in dates)
            {
                T[] data = await dataSet.Where(t => t.Date > date).ToArrayAsync();
                await mqtt.Publish(topic, new Data(data), retain: true);
            }
        }

        private static async Task Temperature(string topic, string station, string subtopic, Data data)
        {
            Console.WriteLine($"Received: Topic: {topic}, Station: {station}, Subtopic: {subtopic}, Value: {data.Value}");

            await dbContext.Temperatures.AddAsync(new DoubleValue(data.Id, data.Date, station, (double)data.Value));
            await GenerateLifeData(subtopic, dbContext.Temperatures);
            await dbContext.SaveChangesAsync();
        }

        private static async Task AirPressure(string topic, string station, string subtopic, Data data)
        {
            Console.WriteLine($"Received: Topic: {topic}, Station: {station}, Subtopic: {subtopic}, Value: {data.Value}");

            await dbContext.AirPressures.AddAsync(new DoubleValue(data.Id, data.Date, station, (double)data.Value));
            await GenerateLifeData(subtopic, dbContext.AirPressures);
            await dbContext.SaveChangesAsync();
        }
        private static async Task AirPurity(string topic, string station, string subtopic, Data data)
        {
            Console.WriteLine($"Received: Topic: {topic}, Station: {station}, Subtopic: {subtopic}, Value: {data.Value}");

            await dbContext.AirPuritys.AddAsync(new DoubleValue(data.Id, data.Date, station, (double)data.Value));
            await GenerateLifeData(subtopic, dbContext.AirPuritys);
            await dbContext.SaveChangesAsync();
        }
        private static async Task AirToxicity(string topic, string station, string subtopic, Data data)
        {
            Console.WriteLine($"Received: Topic: {topic}, Station: {station}, Subtopic: {subtopic}, Value: {data.Value}");

            await dbContext.AirToxicities.AddAsync(new DoubleValue(data.Id, data.Date, station, (double)data.Value));
            await GenerateLifeData(subtopic, dbContext.AirToxicities);
            await dbContext.SaveChangesAsync();
        }
        private static async Task AirHumidity(string topic, string station, string subtopic, Data data)
        {
            Console.WriteLine($"Received: Topic: {topic}, Station: {station}, Subtopic: {subtopic}, Value: {data.Value}");

            await dbContext.AirHumidities.AddAsync(new DoubleValue(data.Id, data.Date, station, (double)data.Value));
            await GenerateLifeData(subtopic, dbContext.AirHumidities);
            await dbContext.SaveChangesAsync();
        }
        private static async Task WindStrength(string topic, string station, string subtopic, Data data)
        {
            Console.WriteLine($"Received: Topic: {topic}, Station: {station}, Subtopic: {subtopic}, Value: {data.Value}");

            await dbContext.WindStrengths.AddAsync(new DoubleValue(data.Id, data.Date, station, (double)data.Value));
            await GenerateLifeData(subtopic, dbContext.WindStrengths);
            await dbContext.SaveChangesAsync();
        }
        private static async Task WindDirection(string topic, string station, string subtopic, Data data)
        {
            Console.WriteLine($"Received: Topic: {topic}, Station: {station}, Subtopic: {subtopic}, Value: {data.Value}");

            await dbContext.WindDirections.AddAsync(new DoubleValue(data.Id, data.Date, station, (double)data.Value));
            await GenerateLifeData(subtopic, dbContext.WindDirections);
            await dbContext.SaveChangesAsync();
        }
        private static async Task PrecipitationType(string topic, string station, string subtopic, Data data)
        {
            Console.WriteLine($"Received: Topic: {topic}, Station: {station}, Subtopic: {subtopic}, Value: {data.Value}");

            await dbContext.PrecipitationTypes.AddAsync(new StringValue(data.Id, data.Date, station, (string)data.Value));
            await GenerateLifeData(subtopic, dbContext.PrecipitationTypes);
            await dbContext.SaveChangesAsync();
        }
        private static async Task PrecipitationAmount(string topic, string station, string subtopic, Data data)
        {
            Console.WriteLine($"Received: Topic: {topic}, Station: {station}, Subtopic: {subtopic}, Value: {data.Value}");

            await dbContext.PrecipitationAmounts.AddAsync(new DoubleValue(data.Id, data.Date, station, (double)data.Value));
            await GenerateLifeData(subtopic, dbContext.PrecipitationAmounts);
            await dbContext.SaveChangesAsync();
        }
    }
}
