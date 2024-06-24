import { Box } from "@mui/material";
import Header from "./components/Header";
import Body from "./components/Body";
import AirAnalytics from "./components/AirAnalytics";
import "./Weather.scss";

const Weather = () => {
  return (
    <Box className="weather">
      <Header />
      <Body />
      <AirAnalytics />
    </Box>
  );
};

export default Weather;
