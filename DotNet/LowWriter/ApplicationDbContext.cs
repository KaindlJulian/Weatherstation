using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Text;

namespace LogWriter
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<DoubleValue> Temperatures { get; set; }
        public DbSet<DoubleValue> AirPressures { get; set; }
        public DbSet<DoubleValue> AirPuritys { get; set; }
        public DbSet<StringValue> AirToxicities { get; set; }
        public DbSet<DoubleValue> AirHumidities { get; set; }
        public DbSet<StringValue> WindDirections { get; set; }
        public DbSet<DoubleValue> WindStrengths { get; set; }
        public DbSet<StringValue> PrecipitationTypes { get; set; }
        public DbSet<DoubleValue> PrecipitationAmounts { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(Environment.CurrentDirectory)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
            var configuration = builder.Build();
            Debug.Write(configuration.ToString());
            string connectionString = configuration["ConnectionStrings:DefaultConnection"];
            optionsBuilder.UseSqlServer(connectionString);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
        }
    }
}
