import { Box } from "@mui/material";
import weather from "../assets/images/weather.png";
import "./styles/CustomLoader.scss";

function CustomLoader() {
  return (
    <Box className="custom-loader">
      <Box component="img" alt="loader-img" src={weather} />
    </Box>
  );
}

export default CustomLoader;
