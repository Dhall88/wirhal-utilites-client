import React, { Component } from 'react';
import Chart from 'chart.js'

export default class BarChart extends Component {

  componentDidUpdate(){
    this.createChart(this.prepareData(this.props.bulkData));

    // console.log(this.props.bulkData);
  }
  // test = () => {
  // }

  prepareData = (data) => {
  const chartData = {
    labels: [],
    datasets: [
      {
        label: this.props.label,
        data: []
      }
    ]
  }

  for(let i = 2; i<7;i++) {
    chartData.labels.push(i*3)
    chartData.datasets[0].data.push(data[i][this.props.dataType[0]][this.props.dataType[1]])
  }
  return chartData
}

createChart = (data) => {
  const ctx = document.querySelector(`#${this.props.label}`)
  const tempsChart = new Chart(ctx, {
    type: 'line',
    data: data
      })
}
  render () {
    return (
      <>
        <h1 onClick={this.test}>Temperatures</h1>
        <canvas id={this.props.label} width="300" height="100"></canvas>
      </>
    )
  }
}
