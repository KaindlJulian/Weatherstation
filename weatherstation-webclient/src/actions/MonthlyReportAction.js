export const initReport = (res) => ({
	type: "INIT_MONTHLY_REPORT",
	payload: res
})

export function InitMonthlyReport(client){
	return (dispatch) => {
		console.log(client)
        client.on('message',(topic, message) => {
			console.log(message.toString())
			var obj = JSON.parse(message.toString())
			dispatch(initReport(obj))
		})
		
	}	
}