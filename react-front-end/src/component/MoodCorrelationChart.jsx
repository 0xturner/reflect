import React, { Component } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";

const chartOptions = {
  legend: {
    display: true,
    position: "bottom"
  }
};

class Correlations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pulse: null,
      mood: null
    };
  }

  dashboardMoodCorrelationChart = {
    data: function(pulseData, moodData, labels) {
      console.log("arguments:", arguments);
      return {
        labels: labels,
        datasets: [
          {
            label: "Mood Rank",
            data: moodData,
            fill: false,
            borderColor: "#fbc658",
            backgroundColor: "transparent",
            pointBorderColor: "#fbc658",
            pointRadius: 4,
            pointHoverRadius: 4,
            pointBorderWidth: 8
          },
          {
            label: "Productivity Pulse",
            data: pulseData,
            fill: false,
            borderColor: "#51CACF",
            backgroundColor: "transparent",
            pointBorderColor: "#51CACF",
            pointRadius: 4,
            pointHoverRadius: 4,
            pointBorderWidth: 8
          }
        ]
      };
    }
  };

  fetchPulse = () => {
    return axios
      .get("api/pulse") // You can simply make your requests to "/api/whatever you want"
      .then(response => {
        const mappedData = response.data
          .map(({ productivity_pulse, date }) => {
            return { pulse: productivity_pulse / 10, date };
          })
          .sort((a, b) => {
            return new Date(a.date) - new Date(b.date);
          });
        console.log("pulse sorted:", mappedData);
        // const labelData = response.data.map(
        //   labelMap => new Date(labelMap.date)
        // ).sort(function (a, b) {
        //   return
        // });
        // const dailyPulse = this.dashboardMoodCorrelationChart.data(
        //   mappedData,
        //   labelData
        // );
        return mappedData;
        // this.setState({
        //   pulse: dailyPulse
        // });
      });
  };

  fetchMood = () => {
    return axios
      .get("api/moods") // You can simply make your requests to "/api/whatever you want"
      .then(response => {
        // console.log("Responible response: ", response);
        const mappedMoodData = response.data.score
          .map(({ rank, date }) => {
            return { rank, date };
          })
          .sort((a, b) => {
            return new Date(a.date) - new Date(b.date);
          });
        console.log("mood sorted:", mappedMoodData);
        // console.log("Mood data: ", mappedMoodData);
        // const labelData = response.score.map(
        //   labelMap => new Date(labelMap.date)
        // );
        // console.log("Date: ", labelData);
        // const dailyMood = this.dashboardMoodCorrelationChart.data(
        //   mappedMoodData,
        //   labelData
        // );
        return mappedMoodData;
        // this.setState({
        //   mood: dailyMood
        // });
      });
  };

  componentWillMount() {
    // this.fetchPulse() && this.fetchMood();
    Promise.all([this.fetchPulse(), this.fetchMood()]).then(
      ([pulseResult, moodResult]) => {
        const shortestLength = Math.min(pulseResult.length, moodResult.length);
        const pulses = pulseResult
          .slice(0, shortestLength)
          .map(({ pulse }) => pulse);
        const moods = moodResult
          .slice(0, shortestLength)
          .map(({ rank }) => rank);
        const dates = pulseResult
          .slice(0, shortestLength)
          .map(({ date }) => date);
        console.log("pulses:", pulses);
        console.log("moods:", moods);
        console.log("dates:", dates);
        const results = this.dashboardMoodCorrelationChart.data(
          pulses,
          moods,
          dates
        );
        this.setState({ pulse: results, mood: results });
      }
    );
  }

  render() {
    return (
      <>
        <Line
          data={this.state.pulse && this.state.mood}
          options={chartOptions}
          width={400}
          height={150}
        />
      </>
    );
  }
}

export default Correlations;
