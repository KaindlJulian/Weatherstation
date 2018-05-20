
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
      topic : '/report/may/monthly/'
    }, action){
        switch (action.type) {
            case 'MONTHLY_REPORT':
            console.log(action.payload);
            var categories;
            var counter = 0;
            for(var temp of action.payload.values.temperatures){
              counter++;
              categories.push(counter)
            }
            return{
              ...state,
              temperature: action.payload.values.temperature,
              temperatures: action.payload.values.temperatures,
              air: {
                pressure: action.payload.values.pressure,
                purity: action.payload.values.purity,
                humidity: action.payload.values.humidity,
              },
              wind : {
                strength: action.payload.values.strength,
              },
              precipitation: {
                amount : action.payload.values.amount
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