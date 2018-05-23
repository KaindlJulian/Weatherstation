export const initReport = (res) => ({
	type: res.id,
	payload: res
})

export function InitMonthlyReport(mqttService){
	return (dispatch) => {
		console.log(mqttService)
        mqttService.on('message',(topic, message) => {
			console.log(message.toString())
			var obj = JSON.parse(message.toString())
			dispatch(initReport(obj))
		})
		
	}	
}
export function changeTopic(topic){
	return{type:"CHANGE_TOPIC", payload: topic}
}