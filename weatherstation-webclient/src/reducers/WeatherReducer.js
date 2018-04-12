export default function reducer(state={
    currencyList : [],
    data: {
      labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
      datasets: [
        {
          label: "Population (millions)",
          backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
          data: [2478,5267,734,784,433]
        }
      ]
    },
    fetching : false,
    searchString : '',
    EURExchange :0,
}, action){
    switch (action.type) {
        case 'INITIAL_ITEMS':
        return {
            ...state,
            searchString:action.payload,
          }
          default:
          return state
            
    }
}