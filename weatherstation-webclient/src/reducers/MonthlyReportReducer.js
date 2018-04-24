var temp = {labels:  [],
datasets: [
  {
    label: "Temperature(Celsius)",
    backgroundColor: '',
    data: [],
    borderColor:'white'
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
      responsive : true,
      legend: {
            labels: {
                fontColor: "white",
                fontSize: 12
            }
        },
      scales: {
        xAxes: [
          {
            gridLines: {
                    display: false,
                },
                ticks: {
                  fontColor: "#FFFFF", // this here
                },
              }   
        ],
        yAxes:[
          {
            gridLines: {
                    display: false,
                },
                ticks: {
                  fontColor: "#FFFFF", // this here
                },
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