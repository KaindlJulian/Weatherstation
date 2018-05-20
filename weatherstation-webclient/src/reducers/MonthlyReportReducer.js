
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

            break;
              case 'CHANGE_TOPIC':
              return{...state, topic: action.payload.topic, date : action.payload.date}
              default:
              return state
                
        }
    }