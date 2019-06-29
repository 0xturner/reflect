import React, { Component } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import moment from "moment";
import MoodDisplay from "./MoodDisplayToday";

const chartOptions = {
  legend: {
    display: false
  },
  xAxes: [
    {
      type: "date",
      length: 7
    }
  ],
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true
        }
      }
    ]
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
        const allData = response.data.score;
        const previousWeek = allData.slice(allData.length - 7);
        const mappedData = previousWeek.map(moodData => moodData.rank);
        console.log("previous week: ", previousWeek);
        const labelData = previousWeek.map(dateData => dateData.date);
        const dayOfWeek = labelData.map(weekDay => {
          return moment(weekDay)
            .add(1, "days")
            .format("dddd");
        });
        console.log("date:", dayOfWeek);
        console.log("array of dates", labelData);
        const moodRank = this.dashboardMoodChart.data(mappedData, dayOfWeek);
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
          height={150}
        />
      </>
    );
  }
}

export default Mood;
