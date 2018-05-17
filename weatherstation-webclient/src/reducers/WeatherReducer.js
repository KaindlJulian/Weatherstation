
export default function reducer(state={
    temperature: 0,
    date : '',
    daytime : "day",
    air: {
      pressure: 0,
      purity: 0,
      toxicity: '',
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
    categories: [],
    topics : [
      '/station/sensor1/temperature/',
       '/station/sensor1/wind/direction/',
        '/station/sensor1/wind/strength/',
        '/station/sensor1/air/humidity/',
        '/station/sensor1/precipitation/type/',
        '/station/sensor1/precipitation/amount/',
      '/station/sensor1/air/purity/',
      '/station/sensor1/air/toxicity/'],
      location : 'Sensor-1'
}, action){
    switch (action.type) {
        case 'TEMPERATURE':
        var data;
        var categories;
        var daytime;
        console.log(action.payload);
        
        var d = action.payload.date.substr(action.payload.date.indexOf(':') - 2, 3);
        if (parseInt(d.slice(0, 2), 10) >= 6 && parseInt(d.slice(0, 2), 10) <= 18) {
          daytime = 'day';
        } else {
          daytime = 'night';
        }
        data = state.data.slice(0)
        categories = state.categories.slice(0)
        if(d === "00:"){
          data = [];
          categories = [];
        }
        data.push(+action.payload.value)
        categories.push(d + "00")
        return {
            ...state,
            temperature: action.payload.value,
            date : action.payload.date,
            daytime: daytime,
            data: data,
            categories : categories
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
          case 'AIR_PURITY':
          console.log(action.payload)
          return{
            ...state,
            air: {
              ...state.air,
              purity : action.payload.value
            }
          }
          case 'LOCATION_CHANGE':
          console.log(action.payload)
          return{
            ...state,
            location: action.payload
          }
          case 'AIR_TOXICITY':
          console.log(action.payload)
          return{
            ...state,
            air : {
              ...state.air,
              toxicity: action.payload.value
            }
          }


          default:
          return state
            
    }
}