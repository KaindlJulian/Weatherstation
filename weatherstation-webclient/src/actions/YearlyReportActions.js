export const initReport = (res, topic) => ({
	type: topic,
	payload: res
})

export function InitYearlyReport(mqttService){
	return (dispatch) => {
		console.log(mqttService)
        mqttService.on('message',(topic, message) => {
			console.log(message.toString())
			var obj = JSON.parse(message.toString())
			var topic = topic.toString()
			dispatch(initReport(obj, topic))
		})
		
	}	
}
export function changeTopic(topic){
	return{type:"CHANGE_TOPIC", payload: topic}
}