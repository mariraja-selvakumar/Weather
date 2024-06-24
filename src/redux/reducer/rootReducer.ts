import { combineReducers } from "redux";
import weatherSlice from "./slices/weatherSlice";
import airPollutionSlice from "./slices/airPollutionSlice";

const rootReducer = combineReducers({
  weather: weatherSlice,
  pollution: airPollutionSlice,
});

export default rootReducer;
