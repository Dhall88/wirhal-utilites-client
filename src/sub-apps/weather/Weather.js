import React, {Component} from 'react'
import styled from 'styled-components';
import BarChart from './BarChart'
import baseballCap from './images/baseball-cap.png'
import coat from './images/coat.png'
import longSleeveShirt from './images/long-sleeve-shirt.png'
import rainBoots from './images/rain-boots.png'
import raincoat from './images/raincoat.jpg'
import shorts from './images/shorts.png'
import sneakers from './images/sneakers.png'
import sunglasses from './images/sunglasses.png'
import sweater from './images/sweater.png'
import tShirt from './images/t-shirt.png'
import umbrella from './images/umbrella.png'
import windBreaker from './images/windbreaker.png'
import winterHat from './images/winter-hat.png'

const FlexWrapper=styled.div`
  display: flex;
  justify-content: space-between;
  height: 1000px;
`;

let weaterKey = '896179a99ad8c7642c9e6c4a5fad3134'
let url = 'http://api.openweathermap.org/data/2.5/forecast?zip=22903,us&appid=896179a99ad8c7642c9e6c4a5fad3134'

export default class Weather extends Component {
  state={
    data:[],
    zips:[],
    activeZip:'',
    displayCharts:false
  }
  warmArr=[baseballCap, coat, longSleeveShirt, rainBoots, raincoat, shorts, sneakers, sunglasses, sweater, tShirt, umbrella, windBreaker, winterHat]

  componentDidMount = () => {
    fetch('https://localhost:3000/zips')
    .then(response => response.json())
    .then(json => this.setState({zips: json}))
    .catch(error => console.error(error))
  }

  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value })
  }

  // getData = () => {
  // }

  handleSubmit = (event) => {
    event.preventDefault();
    fetch(`http://api.openweathermap.org/data/2.5/forecast?zip=${this.state.activeZip},us&units=imperial&appid=896179a99ad8c7642c9e6c4a5fad3134`)
    .then(data => data.json())
    .then(jData => this.setState({
            data:jData.list,
            displayCharts:true

            }))

    fetch('localhost:3000/zips', {
      body: JSON.stringify({
        zip: this.state.activeZip,
      }),
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
    })
    .then(createdZip => {
      return createdZip.json();
    })
    .then(jsonedZip => {
      this.setState({
        activeZip:'',
        zips: [...this.state.zips, jsonedZip],
      });
    });
}

deleteZip = (id, index) => {
   fetch('localhost:3000/zips/'+id, {
       method: "DELETE"
   }).then(data => {
       this.setState({
           todos: [
               ...this.state.zips.slice(0, index),
               ...this.state.zips.slice(index + 1)
           ]
       })
   })
}

clothingSelection = () => {

}



  render() {
    return(
      <>
      <h1>Weather</h1>
      <form onSubmit={this.handleSubmit}>
      <ul>
      {this.state.zips.map((zip)=> {
        return <li>{zip}</li>
      })}
      </ul>
        <input type="text" value={this.state.activeZip} id="activeZip" onChange={this.handleChange} />
        <input type="submit" />
      </form>
      {this.state.displayCharts?
      <FlexWrapper>
        <BarChart dataType={['main','temp']} label='Temperature' bulkData={this.state.data}/>
        <BarChart dataType={['rain','3h']} label='Rain' bulkData={this.state.data}/>
        <BarChart dataType={['main','humidity']} label='Humidity' bulkData={this.state.data}/>
      </FlexWrapper>
      :''}
        {this.warmArr.map((item) => {
          return <img src={item}></img>


        })}
      </>
    )
  }
}
