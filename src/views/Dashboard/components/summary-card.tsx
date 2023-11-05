import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";
import { SummaryCardProps } from "../types";

const SummaryCard = (props: SummaryCardProps) => {
  const { percentIncrease, percentValue, count, title, color } = props;

  const options: ApexOptions = {
    colors: [color, "#f5f6fa"],
    labels: ["Percent", ""],
    stroke: {
      lineCap: "round",
    },

    plotOptions: {
      pie: {
        donut: {
          size: "82%",
          background: "transparent",
          labels: {
            show: true,
            total: {
              show: true,
              color: "#333333",
              formatter: function (val) {
                console.log(val, "val");
                return val.series[0] + "%";
              },
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: false,
      // formatter: function (val) {
      //   return val + "%";
      // },
    },
    responsive: [
      {
        breakpoint: 2600,
        options: {
          chart: {
            width: 180,
          },
        },
      },
      {
        breakpoint: 640,
        options: {
          chart: {
            width: 200,
          },
        },
      },
    ],
  };
  const series = [percentValue, 100 - percentValue];
  return (
    <div className="card flex justify-between gap-1 max-w-sm">
      <div className="">
        <h6>{title}</h6>
        <h4>{count}</h4>
      </div>
      <div>
        <ReactApexChart options={options} series={series} type="donut" />
      </div>
    </div>
  );
};

export default SummaryCard;
