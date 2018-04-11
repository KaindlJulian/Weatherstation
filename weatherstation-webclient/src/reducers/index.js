
import { combineReducers } from "redux"

import weather from './WeatherReducer.js'
import { routerReducer } from "react-router-redux";

export default combineReducers({
    weather,
    routing: routerReducer
})