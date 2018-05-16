
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
      categories: [],
      topic : 'report/2018/yearly'
    }, action){
        switch (action.type) {
            case 'YEARLY_REPORT':
            console.log(action.payload);

            
              case 'CHANGE_TOPIC':
              return{...state, topic: action.payload.topic, date : action.payload.date}
              default:
              return state
                
        }
    }