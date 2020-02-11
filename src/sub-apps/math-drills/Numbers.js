import React, { Component } from 'react'

export default class Numbers extends Component {
  state={
    question:0,
    showQuestion:false
  }
  componentDidMount() {
    let numberArr=[];
    for(let i =0;i<100;i++) {
      numberArr.push(i)
    }
  }

  getQuestion = () => {
    console.log('in get');
    this.setState({
      question: (Math.floor(Math.random()*101)),
      showQuestion:true
    })
  }
  render() {
    return( <>
      <h1 onClick={this.getQuestion}>Numbers</h1>
      {this.state.showQuestion?
      <p>What number comes after {this.state.question}?</p>
      :''
      }
      </>
    )
  }
}
