import React, { Component } from 'react';

export default class List extends Component {


render() {
  let listArr=[];
  console.log(this.props.questionData.type);
  if (this.props.questionData.type==="multiple") {
    let randPosition = Math.floor(Math.random()*4)
    if(randPosition===3){
      for(let i = 0; i<3;i++) {
        listArr.push(<li>{this.props.questionData.incorrect_answers[i]}</li>)
        if (i=2) {
          listArr.push(<li>{this.props.questionData.correct_answer}</li>)
        }
      }
    }

    else {
      for(let i = 0; i<3;i++) {
        if (i===randPosition) {
          listArr.push(<li>{this.props.questionData.correct_answer}</li>,<li>{this.props.questionData.incorrect_answers[i]}</li>)
        } else {
          listArr.push(<li>{this.props.questionData.incorrect_answers[i]}</li>)
        }
      }
    }
  }

  else {
    if (this.props.questionData.correct_answer==='True') {
      listArr.push(<li>True</li>, <li>False</li>)
    } else {
      listArr.push(<li>True</li>, <li>False</li>)
    }

  }

  return (
    <div>{listArr}</div>
  )
}
}
