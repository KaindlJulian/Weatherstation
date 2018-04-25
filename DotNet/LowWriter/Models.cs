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

    public class DoubleValue : StationModel
    {
        public double Value { get; set; }

        public DoubleValue() { }
        public DoubleValue(string id, DateTime date, string station, double value) : base(id, date, station)
        {
            Value = value;
        }
    }

    public class StringValue : StationModel
    {
        public string Value { get; set; }

        public StringValue() { }
        public StringValue(string id, DateTime date, string station, string value) : base(id, date, station)
        {
            Value = value;
        }
    }
}
