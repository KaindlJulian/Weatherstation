var temp = {labels:  ['00:00','01:15', '02:00', '03:20', '04:00', '05:00', 
'06:00','07:00','08:00','09:00','10:00','11:00',
    '12:00','13:00','14:00','15:00','16:00','17:00','18:00','23:59'],
datasets: [
  {
    label: "Population (millions)",
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