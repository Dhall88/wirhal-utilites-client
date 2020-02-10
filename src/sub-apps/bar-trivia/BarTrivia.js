import React, { Component } from 'react';
import axios from 'axios';

import List from './List'
// https://opentdb.com/api_token.php?command=request

export default class BarTrivia extends Component {
  state = {
    token:'',
    questions:[],
    questionCounter: 0,
    displayQuestion: false,
    activeQuestion: {},
    score:0
  }

  componentDidMount = () => {
    axios.get('https://opentdb.com/api_token.php?command=request').then(resp => {
      this.setState({
        token:resp.data.token
      })
    });
  }

  getQuestions = () => {
    axios.get(`https://opentdb.com/api.php?amount=10&token=${this.state.token}`)
    .then(resp => {
      this.setState({
        questions: resp.data.results
      })
    })
  }

  nextQuestion = (event) => {
    event.preventDefault();
    this.setState({
      activeQuestion: this.state.questions[this.state.questionCounter],
      questionCounter: (this.state.questionCounter+1),
      displayQuestion: true
    })
    console.log(this.state.questions);
  }

  generateList = () => {

  }

  render() {
    this.generateList()

    return(
      <div>
        <h1 onClick={this.getQuestions}>Bar Triva</h1>
        <div onClick={this.nextQuestion}>Get question</div>
        {this.state.displayQuestion?
          <>
        <p>{this.state.activeQuestion.question.replace(/&quot;/g,`"`).replace(/&#039;/g,"'")}</p>
        <List questionData={this.state.activeQuestion} />
        </>
        :''
      }
      </div>
      // {this.state.displayQuestion?
      // <p>{eval(this.state.activeQuestion.question.replace(/"/g,""))}</p>
      // : ''}
      // {this.state.activeQuestion.incorrect_answers.map(incorrect_answer => {
      //   return <p>{incorrect_answer}</p>
      // })}
    )
  }
}
