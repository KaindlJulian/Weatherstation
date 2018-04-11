export default function reducer(state={
    currencyList : [],
    error : null,
    fetching : false,
    searchString : '',
    EURExchange :0,
}, action){
    switch (action.type) {
        case 'INITIAL_ITEMS':
        return {
            ...state,
            searchString:action.payload
          }
          default:
          return state
            
    }
}