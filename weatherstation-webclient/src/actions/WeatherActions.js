export const initialItems = (res) => ({
	type: "INITIAL_ITEMS",
	payload: res
})

export function loadInitialData(client){
	return (dispatch) => {
		console.log(client)
        client.on('message',(topic, message) => {
			console.log(message.toString())
			dispatch(initialItems(message.toString()))
		})
		
	}	
}