import { useEffect } from "react";
import { Box } from "@mui/material";
import CustomChart from "../../../components/CustomChart";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { getLocation } from "../../../helpers/helpers";
import { airPollutionDetails } from "../../../redux/reducer/slices/airPollutionSlice";
import CustomLoader from "../../../components/CustomLoader";
import "./styles/AirAnalytics.scss";

const AirAnalytics = () => {
  const dispatch = useAppDispatch();

  const { isLoading, data } = useAppSelector((state) => state.pollution);

  useEffect(() => {
    const { latitude, longitude } = getLocation();
    dispatch(airPollutionDetails({ lat: latitude, lon: longitude }));
  }, [dispatch]);

  if (isLoading) return <CustomLoader />;

  return (
    <Box className="air-analytics">{data && <CustomChart data={data} />}</Box>
  );
};

export default AirAnalytics;
