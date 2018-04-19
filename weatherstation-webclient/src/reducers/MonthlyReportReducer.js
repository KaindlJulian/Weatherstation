var temp = {labels:  [],
    datasets: [
      {
        label: "Temperature(Celsius)",
        backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
        data: []
      }
    ]}
    
    export default function reducer(state={
        values: {
            temperature: 0,
        air: {
          pressure: 0,
          purity: 0,
          toxicity: 0,
          humidity: 0,
        },
        wind : {
          direction : "",
          strength : 0,
        },
        precipitation: {
          type : "",
          amount : 0
        },
        },
        
        data: {
          
        },
        options: {
          scales: {
            xAxes: [
              {
                type: 'Date',
                time: {
                  format: "dd",
                  unit: 'day',
                  unitStepSize: 1,
                  displayFormats: {
                    'day': 'dd',
                    min: '1',
                    max: '31'
                  }
                }
              }
            ]
          }
        },
        topic:''
    }, action){
        switch (action.type) {
            case 'INIT_MONTHLY_REPORT':
            console.log(action.payload);
            var counter = 1
            for(var obj of action.payload.value.temperature){
              temp.datasets[0].data.push(obj);
              temp.labels.push(counter);
              counter++;
            }
            
            return {
                ...state,
                temperature: action.payload,
                data : temp
              }
              case 'CHANGE_TOPIC':
              return{...state, topic: action.payload}
              default:
              return state
                
        }
    }