import { Card, CardMedia } from "@mui/material";
import WeatherMain from "./components/WeatherMain";
import noon from "../../../assets/images/noon2.jpg";
import "./styles/Header.scss";

const Header = () => {
  return (
    <Card className="header" variant="outlined">
      <CardMedia
        component="img"
        image={noon}
        alt="img"
        className="card-media"
      />
      <WeatherMain />
    </Card>
  );
};

export default Header;
