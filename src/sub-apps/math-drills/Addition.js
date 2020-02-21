import React, { Component } from 'react'

export default class Addition extends Component {
  state = {
    numArr:[],
    score:0
  }
  questionArr = () => {
    let arr = []
    for(let i = 1; i<=this.props.difficulty; i++) {
      arr.push(Math.round(Math.random()*Math.pow(this.props.difficulty,3)))
    }
    this.setState({
      numArr: arr
    })
    console.log(arr);
  }

  render() {
    return(
      <>
        <h1>Addition</h1>
        <button onClick={this.questionArr}></button>
        <ul>
          {this.state.numArr.map((num)=> {
            return <li>{num}</li>
          })}
        </ul>
      </>
    )
  }
}
