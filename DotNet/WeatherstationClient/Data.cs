using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Text;

namespace WeatherstationClient
{
    public class Data
    {
        public string Id { get; set; }
        public DateTime Date { get; set; }
        public object Value { get; set; }

        public Data() { }

        public Data(object value)
        {
            Value = value;
            Date = DateTime.Now;
        }
    }
}
