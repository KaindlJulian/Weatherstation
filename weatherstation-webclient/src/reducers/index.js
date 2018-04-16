
import { combineReducers } from "redux"

import weather from './WeatherReducer.js'
import monReport from './MonthlyReportReducer.js'
import { routerReducer } from "react-router-redux";

export default combineReducers({
    weather,
    monReport,
    routing: routerReducer
})