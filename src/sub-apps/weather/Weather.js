import React, {Component} from 'react'
import BarChart from './BarChart'

let weaterKey = '896179a99ad8c7642c9e6c4a5fad3134'
let url = 'http://api.openweathermap.org/data/2.5/forecast?zip=22903,us&appid=896179a99ad8c7642c9e6c4a5fad3134'

export default class Weather extends Component {
  state={
    data:[]
  }

    componentDidMount(){
      this.getData();
    }

    getData = () => {
      fetch('http://api.openweathermap.org/data/2.5/forecast?zip=22903,us&units=imperial&appid=896179a99ad8c7642c9e6c4a5fad3134')
      .then(data => data.json())
      .then(jData => this.setState({data:jData.list}))

      setTimeout(() => {console.log(this.state.data)},5000)
  }


  render() {
    return(
      <div>
      <BarChart dataType='temp' bulkData={this.state.data}/>

      </div>
    )
  }
}
