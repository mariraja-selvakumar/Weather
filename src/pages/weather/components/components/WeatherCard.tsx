import { Box, Card, Typography } from "@mui/material";
import humidity from "../../../../assets/icons/humidity.png";
import wind from "../../../../assets/icons/wind.png";
import sunrise from "../../../../assets/icons/sunrise.png";
import sunset from "../../../../assets/icons/sunset.png";
import "./styles/WeatherCard.scss";

interface WeatherCardProps {
  title: "Humidity" | "Wind" | "Sunrise" | "Sunset";
  content: string;
}

const WeatherCard = ({ title, content }: WeatherCardProps) => {
  console.log(content);

  return (
    <Card className="weather-card">
      <Box className="weather-icon">
        <Box
          component="img"
          alt="weather-img"
          src={
            title === "Humidity"
              ? humidity
              : title === "Wind"
              ? wind
              : title === "Sunrise"
              ? sunrise
              : sunset
          }
        />
      </Box>
      <Box className="weather-content">
        <Typography component="h6" variant="h6">
          {title}
        </Typography>
        <Typography component="h6" variant="h6">
          {content}
        </Typography>
      </Box>
    </Card>
  );
};

export default WeatherCard;
