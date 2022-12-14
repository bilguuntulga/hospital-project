import React, { memo, Component } from "react";
import ReactApexChart from "react-apexcharts";
import { treatmentsAPI } from "../apis";

class ServicesChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      series: [
        {
          name: "Үйлчилгээ 1",
          data: [0, 0, 0, 0, 0, 0, 0],
        },
        {
          name: "Үйлчилгээ 2",
          data: [0, 0, 0, 0, 0, 0, 0],
        },
        {
          name: "Үйлчилгээ 3",
          data: [0, 0, 0, 0, 0, 0, 0],
        },
      ],
      options: {
        chart: {
          type: "bar",
          stacked: true,
          toolbar: {
            show: true,
          },
          zoom: {
            enabled: true,
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            dataLabels: {
              total: {
                enabled: true,
              },
            },
          },
        },
        xaxis: {
          type: "category",
          categories: ["Да", "Мя", "Лх", "Пү", "Ба", "Бя", "Ня"],
        },
        legend: {
          position: "bottom",
        },
        fill: {
          opacity: 1,
        },
      },
    };
  }

  componentDidMount() {
    treatmentsAPI.servicesChart().then((res) => {
      if (!res?.series[0]) return;

      this.setState((preState) => ({
        ...preState,
        data: res,
      }));
    });
  }

  render() {
    return (
      <div id="chart">
        <ReactApexChart
          options={{
            ...this.state.options,
            xaxis: {
              type: "category",
              categories: this.state?.data?.categories ?? [
                "Да",
                "Мя",
                "Лх",
                "Пү",
                "Ба",
                "Бя",
                "Ня",
              ],
            },
          }}
          series={
            this.state?.data?.series ?? [
              {
                name: "Үйлчилгээ 1",
                data: [0, 0, 0, 0, 0, 0, 0],
              },
              {
                name: "Үйлчилгээ 2",
                data: [0, 0, 0, 0, 0, 0, 0],
              },
              {
                name: "Үйлчилгээ 3",
                data: [0, 0, 0, 0, 0, 0, 0],
              },
            ]
          }
          type="bar"
          height={235}
        />
      </div>
    );
  }
}

export default memo(ServicesChart);
