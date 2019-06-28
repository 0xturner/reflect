import React, { Component } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";

const chartOptions = {
  legend: {
    display: false
  }
};

class Mood extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rank: null
    };
  }

  dashboardMoodChart = {
    data: (moodData, labels) => {
      return {
        labels,
        datasets: [
          {
            label: "Mood Rank",
            backgroundColor: "#fbc757",
            borderColor: "#fbc757",
            borderWidth: 1,
            hoverBackgroundColor: "rgba(255,99,132,0.4)",
            hoverBorderColor: "rgba(255,99,132,1)",
            data: moodData
          }
        ]
      };
    }
  };

  fetchMoodData = () => {
    axios
      .get("api/moods") // You can simply make your requests to "/api/whatever you want"
      .then(response => {
        const mappedData = response.data.score.map(moodData => moodData.rank);
        console.log("Mood data: ", mappedData);
        const labelData = response.data.score.map(dateData => dateData.date);
        const moodRank = this.dashboardMoodChart.data(mappedData, labelData);
        this.setState({
          rank: moodRank
        });
      });
  };

  componentWillMount() {
    this.fetchMoodData();
  }

  render() {
    return (
      <>
        <Bar
          data={this.state.rank}
          options={chartOptions}
          width={400}
          height={100}
        />
      </>
    );
  }
}

export default Mood;
