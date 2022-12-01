import React, { memo, Component } from "react";
import ReactApexChart from "react-apexcharts";

class ServicesChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          name: "PRODUCT A",
          data: [44, 55, 41, 67, 22],
        },
        {
          name: "PRODUCT B",
          data: [13, 23, 20, 8, 13],
        },
        {
          name: "PRODUCT C",
          data: [11, 17, 15, 15, 21],
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
          categories: ["Да", "Мя", "Лх", "Пү", "Ба"],
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

  render() {
    return (
      <div id="chart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="bar"
          height={250}
        />
      </div>
    );
  }
}

export default memo(ServicesChart);
