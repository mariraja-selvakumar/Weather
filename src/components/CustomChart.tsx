import highchart from "highcharts/highstock";
import HighChart from "highcharts-react-official";
import { AirQualityResponse } from "../redux/reducer/slices/airPollutionSlice";

interface CustomChartOptions {
  data: AirQualityResponse;
}

const CustomChart = ({ data }: CustomChartOptions) => {
  const options = {
    title: {
      text: "Air Pollution",
      align: "center",
      style: {
        color: "#FFF",
      },
    },
    chart: {
      type: "column",
      spacingBottom: 30,
      borderRadius: 10,
      backgroundColor: "transparent",
    },
    xAxis: {
      categories: [
        "Carbon Monoxide",
        "Nitrogen Monoxide",
        "Nitrogen dioxide",
        "Ozone",
        "Sulphur dioxide",
        "Fine Particles",
        "Coarse Particulate",
        "Ammonia",
      ],
      labels: {
        style: {
          color: "#FFF",
        },
      },
    },
    yAxis: {
      gridLineWidth: 0,
      title: {
        text: "Pollutant Concentration (μg/m3)",
        style: {
          color: "#FFF",
        },
      },
      labels: {
        style: {
          color: "#FFF",
        },
      },
    },
    legend: {
      enabled: true,
      align: "center",
      verticalAlign: "bottom",
      borderRadius: 5,
      color: "#5EFFDD",
    },
    series: [
      {
        type: "column",
        color: "#FFF",
        name: "Pollutants",
        borderRadius: 5,
        data: Object.values(data?.list?.[0]?.components),
        showInLegend: false,
      },
    ],
    tooltip: {
      headerFormat: "<b>{point.x}</b><br><br>",
      pointFormat: "{series.name}: {point.y:.0f} μg/m3<br />",
    },
    credits: {
      enabled: false,
    },
    accessibility: {
      enabled: false,
    },
  };

  return <HighChart highcharts={highchart} options={options} />;
};

export default CustomChart;
