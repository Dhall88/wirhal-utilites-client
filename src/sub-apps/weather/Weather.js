import React, {Component} from 'react'
import styled from 'styled-components';
import BarChart from './BarChart'
import baseballCap from './images/baseball-cap.png'
import coat from './images/coat.png'
import longSleeveShirt from './images/long-sleeve-shirt.png'
import rainBoots from './images/rain-boots.png'
import raincoat from './images/raincoat.png'
import shorts from './images/shorts.png'
import sneakers from './images/sneakers.png'
import sunglasses from './images/sunglasses.png'
import sweater from './images/sweater.png'
import tShirt from './images/t-shirt.png'
import umbrella from './images/umbrella.png'
import windBreaker from './images/windbreaker.png'
import winterHat from './images/winter-hat.png'

const Ul=styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const Li=styled.li`
  font-size: 20px;
  padding: 0 0 1em 0;
  margin: 0;
  transition-duration: 0.2s;

  &:hover {
  transform:scale(1.2);
}
`;

const FlexWrapper=styled.div`
  display: flex;
  justify-content: center;
  height: 400px;
`;

const FlexWrapperColumn=styled.div`
  display: flex;
  align-items: center;
  flex-direction: column
`;

const Form=styled.form`
  margin: 1em;
`;

const Option=styled.option`
  font-size: 30px;Aa
`;

const Select=styled.select`
  font-size: 30px;
  margin: .5em;
  padding: 0 0 0 z.5em;
`;

const Label=styled.label`
  padding: .5em;
`;

const Input=styled.input`
  font-size:30px;

`;

const Button=styled.button`
  font-size:30px;

`;

let weaterKey = '896179a99ad8c7642c9e6c4a5fad3134'
let url = 'http://api.openweathermap.org/data/2.5/forecast?zip=22903,us&appid=896179a99ad8c7642c9e6c4a5fad3134'

export default class Weather extends Component {
  state={
    data:[],
    zips:[],
    activeZip:'',
    displayCharts:false,
    displayClothes:false,
    clothesArr:[]
  }
  coldArr=[coat,winterHat]
  coolArr=[baseballCap,longSleeveShirt,sweater]
  hotArr=[shorts, sneakers, tShirt]
  rainArr=[rainBoots, raincoat, umbrella]
  windArr=[windBreaker]
  sunArr=[sunglasses]

  componentDidMount = () => {
    this.getZips()
  }

  getZips = () => {
    fetch('http://localhost:3000/zips')
    .then(response => response.json())
    .then(json => {
      console.log(json)
      this.setState({zips: json})
  })
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

    setTimeout(() => {
      // console.log(this.state.data[0]);
      this.clothingSelection();
    },1000)
}

saveZip = () => {
  console.log('in save zip');
  fetch('http://localhost:3000/zips', {
    body: JSON.stringify({zip: this.state.activeZip}),
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
    console.log(jsonedZip);
    this.setState({
      activeZip:'',
      zips: [...this.state.zips, jsonedZip],
    });
  });

}
// deleteZip = (id, index) => {
//    fetch('localhost:3000/zips/'+id, {
//        method: "DELETE"
//    }).then(data => {
//        this.setState({
//            todos: [
//                ...this.state.zips.slice(0, index),
//                ...this.state.zips.slice(index + 1)
//            ]
//        })
//    })
// }

setActiveZip = (event) => {
  event.preventDefault();
  this.setState({
    activeZip: event.target.id
  })

  setTimeout(()=>{
    this.handleSubmit(event)
  },200)
}

clothingSelection = () => {
  let res = [], avgTemp=0, avgRain=0, avgWind=0, sunnyBoolean=false, rainBoolean=false, windBoolean=false;
  for(let i = 0; i<5; i++) {
    avgTemp+=this.state.data[i].main.feels_like;
    if(this.state.data[i].rain!=undefined) {
      avgRain+=this.state.data[i].rain['3h']
    }
    if(this.state.data[i].wind!=undefined) {
      avgWind+=this.state.data[i].wind.speed;
    }
    if(this.state.data[i].weather.main==='Clear')
      sunnyBoolean=true;
  }
  avgTemp=avgTemp/4;
  if(avgTemp<40){
    for(let i = 0; i<this.coldArr.length;i++){
      res.push(this.coldArr[i])
    }
  }
  if(avgTemp>=40&&avgTemp<=70){
    for(let j = 0; j<this.warmArr.length;j++){
      res.push(this.warmArr[j])
    }
  }
  if(avgTemp>70){
    for(let k = 0; k<this.hotArr.length;k++){
      res.push(this.hotArr[k])
    }
  }
  if(avgRain/4>.5){
    for(let l = 0; l<this.rainArr.length;l++){
      res.push(this.rainArr[l])
    }
  }
  if(avgWind/4>20){
    for(let a = 0; a<this.windArr.length;a++){
      res=[].push(this.windArr[a])
    }
  }
  if(sunnyBoolean){
    for(let b = 0; b<this.sunArr.length;b++){
      res=[].push(this.sunArr[b])
    }
  }

  this.setState({
    clothesArr:res,
    displayClothes:true
  })

  console.log(avgTemp);
  console.log(avgRain);
  console.log(avgWind);
  setTimeout(()=>{
    console.log(this.state.clothesArr);
  })
}



  render() {
    return(
      <FlexWrapperColumn>
      <h2>Weather</h2>
      <div/>
      <Ul>
      {this.state.zips.map((zip)=> {
        return <Li onClick={this.setActiveZip} id={zip.zip}>{zip.zip}</Li>
      })}
      </Ul>
      <Form onSubmit={this.handleSubmit}>
        <Input type="text" value={this.state.activeZip} id="activeZip" onChange={this.handleChange} />
        <Input type="submit" />
      </Form>
      <button onClick={this.saveZip}>SAVE ZIP</button>
      {this.state.displayCharts?
      <FlexWrapper>
        <BarChart dataType={['main','temp']} label='Temperature' bulkData={this.state.data}/>
        <BarChart dataType={['rain','3h']} label='Rain' bulkData={this.state.data}/>
        <BarChart dataType={['main','humidity']} label='Humidity' bulkData={this.state.data}/>
      </FlexWrapper>
      :''}
      <FlexWrapper>
        {this.state.clothesArr.map((clothing)=> {
        return <div><img src={clothing} /></div>
      })}
      </FlexWrapper>
      </FlexWrapperColumn>
    )
  }
}
