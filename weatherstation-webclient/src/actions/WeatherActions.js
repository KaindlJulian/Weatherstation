export const initialItems = (res) => ({
	type: res.id,
	payload: res
})

export function loadInitialData(client){
	return (dispatch) => {
		console.log(client)
        client.on('message',(topic, message) => {
				console.log(message.toString())
				var obj = JSON.parse(message.toString())
				dispatch(initialItems(obj))
		})
		
	}	
}
export function changeLocation(loc){
	return{type: 'LOCATION_CHANGE', payload : loc}
}