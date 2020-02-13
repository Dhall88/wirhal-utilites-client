import React, { Component } from 'react';
import Chart from 'chart.js'
import '../../sass/weather.scss'

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
    ],
    options: {
                responsive: true
            }
  }

  for(let i = 2; i<7;i++) {
    let total=0;
    let avg=0;
    chartData.labels.push(i*3)
    console.log(this.props.dataType[0]);
    if(data[i][this.props.dataType[0]]===undefined) {
      chartData.datasets[0].data.push(0)
    } else {
    chartData.datasets[0].data.push(data[i][this.props.dataType[0]][this.props.dataType[1]])
    total+=data[i][this.props.dataType[0]][this.props.dataType[1]]
  }
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
      <div className='chart-container'>
        <canvas id={this.props.label} style={{width:"300"}, {height:"100"}}></canvas>
      </div>
    )
  }
}
