var temp = {labels:  [],
datasets: [
  {
    label: "Temperature(Celsius)",
    backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
    data: []
  }
]}

export default function reducer(state={
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
    data: {
      
    },
    options: {
      scales: {
        xAxes: [
          {
            type: 'time',
            time: {
              format: "HH:mm",
              unit: 'hour',
              unitStepSize: 1,
              displayFormats: {
                'minute': 'HH:mm',
                'hour': 'HH:mm',
                min: '00:00',
                max: '23:59'
              }
            }
          }
        ]
      }
    },
    topics : ['/Station/temperature']
}, action){
    switch (action.type) {
        case 'INITIAL_ITEMS':
        console.log(action.payload);
        var counter = 0
        for(var obj of action.payload.temperature){
          temp.datasets[0].data.push(obj);
          temp.labels.push(counter + ':00');
          counter++;
        }
        
        return {
            ...state,
            temperature: action.payload,
            data : temp
          }
          default:
          return state
            
    }
}