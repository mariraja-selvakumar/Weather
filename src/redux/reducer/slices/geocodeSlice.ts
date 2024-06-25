import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import axiosInstance from "../../../axios/axiosInstance";
import URLs from "../../../constants/URLs";

const AppID = process.env.REACT_APP_APP_ID;

interface ThunkArgs {
  lat: number;
  lon: number;
}

interface LocalNames {
  [key: string]: string;
}

interface Location {
  name: string;
  local_names: LocalNames;
  lat: number;
  lon: number;
  country: string;
  state: string;
}

type LocationData = Location[];

interface InitialState {
  isLoading: boolean;
  data: LocationData | null;
}

const initialState: InitialState = {
  isLoading: false,
  data: null,
};

export const geocodeDetails = createAsyncThunk<
  LocationData,
  ThunkArgs,
  { rejectValue: AxiosError }
>("geocode", async ({ lat, lon }, thunkApi) => {
  try {
    const response = await axiosInstance({
      method: "GET",
      url: `${URLs.geocode}lat=${lat}&lon=${lon}&appid=${AppID}`,
    });
    return response.data as LocationData;
  } catch (error) {
    return thunkApi.rejectWithValue(error as AxiosError);
  }
});

const geocodeSlice = createSlice({
  name: "geocode",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(geocodeDetails.pending, (state) => {
        state.isLoading = true;
        state.data = null;
      })
      .addCase(
        geocodeDetails.fulfilled,
        (state, action: PayloadAction<LocationData>) => {
          state.isLoading = false;
          state.data = action.payload;
        }
      )
      .addCase(geocodeDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.data = null;
      });
  },
});

export default geocodeSlice.reducer;
