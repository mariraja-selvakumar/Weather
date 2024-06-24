import { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { weatherDetails } from "../../../../redux/reducer/slices/weatherSlice";
import { getLocation } from "../../../../helpers/helpers";
import { useAppDispatch, useAppSelector } from "../../../../redux/store";
import CustomLoader from "../../../../components/CustomLoader";
import sun from "../../../../assets/icons/sun.png";
import "./styles/WeatherMain.scss";

const WeatherMain = () => {
  const dispatch = useAppDispatch();

  const { isLoading, data } = useAppSelector((state) => state.weather);

  useEffect(() => {
    const { latitude, longitude } = getLocation();
    dispatch(weatherDetails({ lat: latitude, lon: longitude }));
  }, [dispatch]);

  if (isLoading) return <CustomLoader />;

  return (
    <Box className="weather-main">
      <Box className="weather-child-1">
        <Box component="img" alt="weather-main" src={sun} />
        <Typography component="h1" variant="h1">
          {`${data?.main?.temp}°`}
        </Typography>
        <Typography component="h6" variant="h6">
          {`${data?.name}`}
        </Typography>
      </Box>
      <Box className="weather-child-2">
        <Typography component="h6" variant="h6">
          {new Date().toLocaleTimeString()}
        </Typography>
        <Typography component="h6" variant="h6">
          {new Date().toLocaleDateString()}
        </Typography>
      </Box>
    </Box>
  );
};

export default WeatherMain;
