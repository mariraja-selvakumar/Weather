import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
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

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
}

interface Wind {
  speed: number;
  deg: number;
  gust: number;
}

interface Clouds {
  all: number;
}

interface Sys {
  country: string;
  sunrise: number;
  sunset: number;
}

interface WeatherResponse {
  coord: Coordinates;
  weather: Weather[];
  base: string;
  main: Main;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

interface InitialState {
  isLoading: boolean;
  data: WeatherResponse | null;
  error: AxiosError | string | null;
}

const initialState: InitialState = {
  isLoading: false,
  data: null,
  error: null,
};

export const weatherDetails = createAsyncThunk<
  WeatherResponse,
  ThunkArgs,
  { rejectValue: AxiosError }
>("weather", async ({ lat, lon }, thunkApi) => {
  try {
    const response = await axiosInstance({
      method: "GET",
      url: `${URLs.weather}lat=${lat}&lon=${lon}&appid=${AppID}&units=metric`,
    });
    return response.data as WeatherResponse;
  } catch (error) {
    return thunkApi.rejectWithValue(error as AxiosError);
  }
});

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(weatherDetails.pending, (state) => {
        state.isLoading = true;
        state.data = null;
        state.error = null;
      })
      .addCase(
        weatherDetails.fulfilled,
        (state, action: PayloadAction<WeatherResponse>) => {
          state.isLoading = false;
          state.data = action.payload;
          state.error = null;
        }
      )
      .addCase(weatherDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.data = null;
        state.error = action.payload as AxiosError;
      });
  },
});

export default weatherSlice.reducer;
