import React, { Component } from 'react'
import styled from 'styled-components';
import axios from 'axios';

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
  flex-direction: column;
  justify-content: center;
  width: 50%;
  margin: auto;
  text-align: center;
  font-size: 30px;
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
  font-size: 30px;
  padding: .5em;
`;

const Input=styled.input`
  font-size:30px;

`;

const Button=styled.button`
  font-size:30px;

`;

export default class Division extends Component {
  state = {
    numArr:[],
    score:0,
    answer:"",
    remainder:"0",
    dispHorray: false,
    dispTryAgain: false
  }

  componentDidMount() {
    axios.get('http://localhost:3000/division_scores/1').then(resp => {
      console.log(resp);
      if(resp!=undefined) {
      this.setState({
        score: resp.data.score
      })
    } else {
      this.setState({
        score: 0
      })
    }
    })
  }

  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value })
  }

  questionArr = () => {
    let arr = []
    for(let i = 1; i<=2; i++) {
      arr.push(Math.round(Math.random()*Math.pow(this.props.difficulty,2))+1)
    }
    arr.sort(function(a,b){
      return b-a;
    })
    this.setState({
      numArr: arr,
      answer: ""
    })
    console.log(arr);
  }
  check = (event) => {
    event.preventDefault();
    let answer = Math.floor(this.state.numArr[0]/this.state.numArr[1]);
    let remainder = this.state.numArr[0]%this.state.numArr[1]
    console.log(answer);
    if(parseInt(this.state.answer)===answer && parseInt(this.state.remainder)===remainder) {
      this.setState({
        dispHorray: true,
        answer: "",
        score: this.state.score+(this.props.difficulty*10)
      })
      setTimeout(()=> {
        this.setState({
          dispHorray: false
        })
        this.questionArr()},3000)
    } else {
      this.setState({
        dispTryAgain: true
      })
      setTimeout(()=> {
        this.setState({
          dispTryAgain: false
        })
      },3000)
    }
  }

  saveScore = () => {
    fetch('http://localhost:3000/division_scores/1', {
      body: JSON.stringify({score: this.state.score}),
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
  }

  componentWillUnmount() {
    this.saveScore()
  }

  render() {
    return(
      <FlexWrapper>
      <h3>Division</h3>
      <div>Score</div>
      <div>{this.state.score}</div>
      <Button onClick={this.questionArr}>Get a new question</Button>
      <Ul>
        {this.state.numArr.map((num)=> {
          return <Li>{num}</Li>
        })}
      </Ul>
      <form autoComplete='off' onSubmit={this.check}>
        <Label>
        Whole Number
        <Input onChange={this.handleChange} type="text" id="answer" />
        </Label>
        <Label>
        Remainder
        <Input onChange={this.handleChange} type="text" id="remainder" />
        </Label>
        <Input type="submit" />
      </form>
      {this.state.dispHorray?<div>YAY</div>:''}
      {this.state.dispTryAgain?<div>Try again</div>:''}
    </FlexWrapper>
    )
  }
}
