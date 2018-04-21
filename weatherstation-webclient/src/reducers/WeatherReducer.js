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
    date : '',
    air: {
      pressure: 0,
      purity: 0,
      toxicity: 0,
      humidity: 0,
    },
    wind : {
      direction : "N",
      strength: 0,
    },
    precipitation: {
      type : "sunny",
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
    topics : [
      '/station/sensor1/temperature/',
       '/station/sensor1/wind/direction/',
        '/station/sensor1/wind/strength/',
        '/station/sensor1/air/humidity/',
        '/station/sensor1/precipitation/type/']
}, action){
    switch (action.type) {
        case 'TEMPERATURE':
        console.log(action.payload);
        return {
            ...state,
            temperature: action.payload.value,
            date : action.payload.date
          }
          case 'WIND_DIRECTION':
          console.log(action.payload)
          return{
            ...state,
            wind : {
              ...state.wind,
              direction : action.payload.value,
            }
            
          }
          case 'WIND_STRENGTH':
          console.log(action.payload)
          return{
            ...state,
            wind : {
              ...state.wind,
              strength : action.payload.value,
            }
            
          }
          case 'AIR_HUMIDITY':
          console.log(action.payload)
          return{
            ...state,
            air : {
              ...state.air,
              humidity: action.payload.value
            }
          }
          case 'PRECIPITATION_TYPE':
          console.log(action.payload)
          return{
            ...state,
            precipitation : {
              ...state.precipitation,
              type: action.payload.value
            }
          }

          default:
          return state
            
    }
}