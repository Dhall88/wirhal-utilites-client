import React, { Component } from 'react'

export default class Subtraction extends Component {
  state = {
    numArr:[],
    score:0,
    answer:"",
    dispHorray: false,
    dispTryAgain: false
  }

  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value })
  }

  questionArr = () => {
    let arr = []
    for(let i = 1; i<=this.props.difficulty; i++) {
      arr.push(Math.round(Math.random()*Math.pow(this.props.difficulty,3)))
    }
    this.setState({
      numArr: arr,
      answer: ""
    })
    console.log(arr);
  }

  check = () => {
    let answer = this.state.numArr[0];
    for(let i = 1; i<this.state.numArr.length; i++) {
      answer-=this.state.numArr[i]
    }
    console.log(answer);
    if(parseInt(this.state.answer)===answer) {
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

  render() {
    return(
      <>
        <h1>Subtraction</h1>
        <div>{this.state.score}</div>
        <button onClick={this.questionArr}></button>
        <ul>
          {this.state.numArr.map((num)=> {
            return <li>{num}</li>
          })}
        </ul>
        <form onSubmit={this.check}>
          <input onChange={this.handleChange} type="text" id="answer" />
          <input type="submit" />
        </form>
        {this.state.dispHorray?<div>YAY</div>:''}
        {this.state.dispTryAgain?<div>Try again</div>:'z'}
      </>
    )
  }
}
