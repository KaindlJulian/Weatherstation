var temp = {labels:  [],
datasets: [
  {
    label: "Temperature(Celsius)",
    backgroundColor: '',
    data: [{name: "0:00", pv:0}],
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
    data: [],
    topics : [
      '/station/sensor1/temperature/',
       '/station/sensor1/wind/direction/',
        '/station/sensor1/wind/strength/',
        '/station/sensor1/air/humidity/',
        '/station/sensor1/precipitation/type/',
        '/station/sensor1/precipitation/amount/']
}, action){
    switch (action.type) {
        case 'TEMPERATURE':
        console.log(action.payload);
        var data = state.data.slice(0)
        data.push({x:data.length, y: +action.payload.value})
        return {
            ...state,
            temperature: action.payload.value,
            date : action.payload.date,
            data: data
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
          case 'PRECIPITATION_AMOUNT':
          console.log(action.payload)
          return{
            ...state,
            precipitation : {
              ...state.precipitation,
              amount: action.payload.value
            }
          }


          default:
          return state
            
    }
}