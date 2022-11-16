import React, { Component } from "react";
import Chart from "react-apexcharts";
import { customerAPI } from "../../apis";

class Donut extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        labels: ["Эрэгтэй", "Эмэгтэй", "Тодорхойгүй"],
      },
      series: [33, 33, 34],
    };
  }

  async fetchData() {
    const result = await customerAPI.getGenderDonut();
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

export default Donut;
