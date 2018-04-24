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
        }

        static void StartMqtt()
        {
            mqtt.Run("localhost", "LogWriter");
            mqtt.Subscribe("temperature", Temperature, true);
        }

        private static async Task Temperature(string topic, string station, string subtopic, Data data)
        {
            await dbContext.Temperatures.AddAsync(new Temperature(data.Id, data.Date, station, (double)data.Value));
            await GenerateLifeTemperatureData();
            await dbContext.SaveChangesAsync();
        }

        private static async Task GenerateLifeTemperatureData()
        {
            DateTime date = DateTime.Now.AddDays(-1);
            Temperature[] temperatures = await dbContext.Temperatures.Where(t => t.Date > date).ToArrayAsync();
            await mqtt.Publish("/life/temerature/day", new Data(temperatures), retain: true);
        }
    }
}
