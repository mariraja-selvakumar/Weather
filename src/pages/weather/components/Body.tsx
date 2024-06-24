import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import WeatherCard from "./components/WeatherCard";
import { useAppSelector } from "../../../redux/store";
import "./styles/Body.scss";

interface CardDetailsProps {
  title: "Humidity" | "Wind" | "Sunrise" | "Sunset";
  content: string;
}

const initialCardDetails: CardDetailsProps[] = [
  { title: "Humidity", content: "67.0%" },
  { title: "Wind", content: "5.14 m/s" },
  { title: "Sunrise", content: "06:06 AM" },
  { title: "Sunset", content: "06:23 PM" },
];

const Body = () => {
  const { data } = useAppSelector((state) => state.weather);

  const [cardDetails, setCardDetails] =
    useState<CardDetailsProps[]>(initialCardDetails);

  useEffect(() => {
    if (data) {
      setCardDetails([
        { title: "Humidity", content: `${data?.main?.humidity} %` },
        { title: "Wind", content: `${data?.wind?.speed} m/s` },
        {
          title: "Sunrise",
          content: new Date(data?.sys?.sunrise * 1000).toLocaleTimeString(),
        },
        {
          title: "Sunset",
          content: new Date(data?.sys?.sunset * 1000).toLocaleTimeString(),
        },
      ]);
    }
  }, [data]);

  return (
    <Grid container className="weather-body" spacing={2}>
      {cardDetails?.map(({ title, content }) => (
        <Grid item key={title} xl={3} lg={3} md={3} sm={6} xs={6}>
          <WeatherCard key={title} title={title} content={content} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Body;
