export const initReport = (res, topic) => ({
	type: topic,
	payload: res
})

export function InitMonthlyReport(mqttService){
	return (dispatch) => {
		console.log(mqttService)
        mqttService.on('message',(topic, message) => {
			console.log(message.toString())
			console.log(topic.toString())
			var obj = JSON.parse(message.toString())
			var topic = topic
			dispatch(initReport(obj, topic))
		})
		
	}	
}
export function changeTopic(topic){
	return{type:"CHANGE_TOPIC", payload: topic}
}