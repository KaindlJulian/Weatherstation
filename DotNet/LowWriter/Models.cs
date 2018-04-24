using System;
using System.Collections.Generic;
using System.Text;

namespace LogWriter
{
    public abstract class BaseModel
    {
        public string Id { get; set; }
        public DateTime Date { get; set; }

        public BaseModel() { }
        public BaseModel(string id, DateTime date)
        {
            Id = id;
            Date = date;
        }
    }

    public abstract class StationModel : BaseModel
    {
        public string Station { get; set; }

        public StationModel() { }
        public StationModel(string id, DateTime date, string station) : base(id, date)
        {
            Station = station;
        }
    }

    public class Temperature : StationModel
    {
        public double Value { get; set; }

        public Temperature() { }
        public Temperature(string id, DateTime date, string station, double value) : base(id, date, station)
        {
            Value = value;
        }
    }
}
