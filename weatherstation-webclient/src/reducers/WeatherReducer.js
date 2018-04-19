var temp = {labels:  [],
datasets: [
  {
    label: "Temperature(Celsius)",
    backgroundColor: '',
    data: [],
    borderColor:'white'
  }
]}

export default function reducer(state={
    temperature: 0,
    air: {
      pressure: 0,
      purity: 0,
      toxicity: 0,
      humidity: 0,
    },
    wind : {
      direction : "",
      strength : 0,
    },
    precipitation: {
      type : "",
      amount : 0
    },
    data: {
      
    },
    options: {
      responsive : true,
      legend: {
            labels: {
                fontColor: "white",
                fontSize: 12
            }
        },
      scales: {
        xAxes: [
          {
            gridLines: {
                    display: false,
                },
                ticks: {
                  fontColor: "#FFFFF", // this here
                },
            type: 'time',
            time: {
              format: "HH:mm",
              unit: 'hour',
              unitStepSize: 1,
              displayFormats: {
                'minute': 'HH:mm',
                'hour': 'HH:mm',
                min: '00:00',
                max: '23:59'
              },
              
                
            }
          }
        ],
        yAxes:[
          {
            gridLines: {
                    display: false,
                },
                ticks: {
                  fontColor: "#FFFFF", // this here
                },
          }
        ]
      }
    },
    topics : ['/station/sensor1/temperature/']
}, action){
    switch (action.type) {
        case 'TEMPERATURE':
        console.log(action.payload);
        return {
            ...state,
            temperature: action.payload,
          }

          default:
          return state
            
    }
}