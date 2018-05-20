
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
      topic : 'report/2018/yearly'
    }, action){
        switch (action.type) {
            case 'YEARLY_REPORT':
            console.log(action.payload);
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
            }
            break;
              case 'CHANGE_TOPIC':
              return{...state, topic: action.payload.topic, date : action.payload.date}
              default:
              return state
                
        }
    }