import React, { Component, memo } from "react";
import Chart from "react-apexcharts";
import { customerAPI } from "../../apis";

class Donut extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        labels: ["Эрэгтэй", "Эмэгтэй"],
        legend: {
          show: true,
          showForSingleSeries: false,
          showForNullSeries: true,
          showForZeroSeries: true,
          position: "bottom",
          horizontalAlign: "center",
          floating: false,
          fontSize: "14px",
          fontFamily: "Helvetica, Arial",
          fontWeight: 400,
          formatter: undefined,
          inverseOrder: false,
          width: undefined,
          height: undefined,
          tooltipHoverFormatter: undefined,
          customLegendItems: [],
          offsetX: 0,
          offsetY: 0,
          labels: {
            colors: undefined,
            useSeriesColors: false,
          },
          markers: {
            width: 12,
            height: 12,
            strokeWidth: 0,
            strokeColor: "#fff",
            fillColors: undefined,
            radius: 12,
            customHTML: undefined,
            onClick: undefined,
            offsetX: 0,
            offsetY: 0,
          },
          itemMargin: {
            horizontal: 5,
            vertical: 0,
          },
          onItemClick: {
            toggleDataSeries: true,
          },
          onItemHover: {
            highlightDataSeries: true,
          },
        },
      },
      series: [50, 50],
    };
  }

  async fetchData() {
    const result = await customerAPI.getGenderDonut();

    if (result?.labels && result?.series)
      this.setState((prev) => ({
        ...prev,
        options: {
          labels: result.labels,
        },
        series: result.series,
      }));
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
      <div className="donut">
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="donut"
          width="380"
        />
      </div>
    );
  }
}

export default memo(Donut);
