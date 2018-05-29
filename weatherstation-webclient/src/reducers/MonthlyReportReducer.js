import monthData from '../data/monthTemperature.json'
    export default function reducer(state={
      temperature: 0,
      temperatures: [],
      date : 'May',
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
      categories: [],
      topic : '/report/5/monthly/'
    }, action){
        switch (action.type) {
            case '/report/5/monthly/':
            console.log(action.payload);
            var categories;
            var counter = 0;
            var temperatures = monthData.temperatures;
            console.log(temperatures)
            var temp =Math.round( action.payload.value.temperature)
            //for(var temp of action.payload.values.temperatures){
              //counter++;
              //categories.push(counter)
            //}
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
              categories: categories,
            }
            break;
              case 'CHANGE_TOPIC':
              return{...state, topic: action.payload.topic, date : action.payload.date}
              default:
              return state
                
        }
    }