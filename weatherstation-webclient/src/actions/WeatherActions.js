export const initialItems = (res) => ({
	type: "INITIAL_ITEMS",
	payload: res
})

export function loadInitialData(){
	return (dispatch) => {
        // dispatch(clearAllItems())
        let res="test";
		dispatch(initialItems(res))
	}	
}