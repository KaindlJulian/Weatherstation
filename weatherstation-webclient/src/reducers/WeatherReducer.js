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
}, action){
    switch (action.type) {
        case 'INITIAL_ITEMS':
        temp.datasets[0].data.push(action.payload.temperature)
        return {
            ...state,
            temperature: action.payload,
            data : temp
          }
          default:
          return state
            
    }
}