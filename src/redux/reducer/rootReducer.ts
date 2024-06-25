import { combineReducers } from "redux";
import weatherSlice from "./slices/weatherSlice";
import airPollutionSlice from "./slices/airPollutionSlice";
import geocodeSlice from "./slices/geocodeSlice";

const rootReducer = combineReducers({
  weather: weatherSlice,
  pollution: airPollutionSlice,
  geocode: geocodeSlice,
});

export default rootReducer;
