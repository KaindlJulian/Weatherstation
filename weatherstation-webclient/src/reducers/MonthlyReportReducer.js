
    export default function reducer(state={
      temperature: 0,
      temperatures: [],
      date : 'MAY',
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
    }, action){
        switch (action.type) {
            case 'MONTHLY_REPORT':
            console.log(action.payload);

            
              case 'CHANGE_TOPIC':
              return{...state, topic: action.payload}
              default:
              return state
                
        }
    }