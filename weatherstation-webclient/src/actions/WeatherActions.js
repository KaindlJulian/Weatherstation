export const initialItems = (res) => ({
	type: res.id,
	payload: res
})

export function loadInitialData(mqttService){
	return (dispatch) => {
		console.log(mqttService)
        mqttService.on('message',(topic, message) => {
				console.log(message.toString())
				var obj = JSON.parse(message.toString())
				dispatch(initialItems(obj))
		})
		
	}	
}
export function changeLocation(loc){
	return{type: 'LOCATION_CHANGE', payload : loc}
}