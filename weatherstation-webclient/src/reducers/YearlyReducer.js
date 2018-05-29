import yearData from '../data/yearTemperature.json'
    export default function reducer(state={
      temperature: 0,
      temperatures: [],
      date : '2018',
      air: {
        pressure: 0,
        purity: 0,
        humidity: 0,
      },
      wind : {
        strength: 0,
      },
      precipitation: {
        amount : 0
      },
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      topic : '/report/5/yearly/'
    }, action){
        switch (action.type) {
            case '/report/5/yearly/':
            var temp = Math.round(action.payload.value.temperature)
            console.log(action.payload);
            var temperatures = yearData.temperatures
            return{
              ...state,
              temperature: temp,
              temperatures : temperatures,
              air: {
                pressure: action.payload.value.air.pressure,
                purity: action.payload.value.air.purity,
                humidity: action.payload.value.air.humidity,
              },
              wind : {
                strength: action.payload.value.wind.strength,
              },
              precipitation: {
                amount : action.payload.value.precipitation.amount
              },
            }
            break;
              case 'CHANGE_TOPIC':
              return{...state, topic: action.payload.topic, date : action.payload.date}
              default:
              return state
                
        }
    }