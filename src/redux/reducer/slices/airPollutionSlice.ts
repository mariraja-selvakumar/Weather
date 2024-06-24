import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../../axios/axiosInstance";
import { AxiosError } from "axios";
import URLs from "../../../constants/URLs";

const AppID = process.env.REACT_APP_APP_ID;

interface ThunkArgs {
  lat: number;
  lon: number;
}

interface Coordinates {
  lon: number;
  lat: number;
}

interface AirQualityComponents {
  co: number;
  no: number;
  no2: number;
  o3: number;
  so2: number;
  pm2_5: number;
  pm10: number;
  nh3: number;
}

interface AirQualityIndex {
  aqi: number;
}

export interface AirQualityData {
  main: AirQualityIndex;
  components: AirQualityComponents;
  dt: number;
}

export type AirQualityResponse = {
  coord: Coordinates;
  list: AirQualityData[];
};

interface InitialState {
  isLoading: boolean;
  data: AirQualityResponse | null;
  error: AxiosError | string | null;
}

const initialState: InitialState = {
  isLoading: false,
  data: null,
  error: null,
};

export const airPollutionDetails = createAsyncThunk<
  AirQualityResponse,
  ThunkArgs,
  { rejectValue: AxiosError }
>("pollution/airPollutionDetails", async ({ lat, lon }, thunkApi) => {
  try {
    const response = await axiosInstance({
      method: "GET",
      url: `${URLs.pollution}lat=${lat}&lon=${lon}&appid=${AppID}`,
    });
    return response.data as AirQualityResponse;
  } catch (error) {
    return thunkApi.rejectWithValue(error as AxiosError);
  }
});

const airPollutionSlice = createSlice({
  name: "pollution",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(airPollutionDetails.pending, (state) => {
        state.isLoading = true;
        state.data = null;
        state.error = null;
      })
      .addCase(
        airPollutionDetails.fulfilled,
        (state, action: PayloadAction<AirQualityResponse>) => {
          state.isLoading = false;
          state.data = action.payload;
          state.error = null;
        }
      )
      .addCase(airPollutionDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.data = null;
        state.error = action.payload as AxiosError;
      });
  },
});

export default airPollutionSlice.reducer;
