import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Li=styled.li`
  list-style-type: none;
`;

const FlexWrapper=styled.div`
  display: flex;
  justify-content: center;
  width: 50%;
`;


export default class BarTrivia extends Component {
  state = {
    token:'',
    questions:[],
    displayQuestion: false,
    activeQuestion: {},
    score:0,
    displayResult:false,
    length:10,
    displayCounter: false,
    playAgain: false,
    initial: true
  }
  questionCounter=0

  componentDidMount = () => {
    axios.get('https://opentdb.com/api_token.php?command=request').then(resp => {
      this.setState({
        token: resp.data.token
      })
    })

  }

  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value ,showComponent:true})
  }

  getQuestions = () => {
  axios.get(`https://opentdb.com/api.php?amount=${this.state.length}&token=${this.state.token}`)
  .then(resp => {
    console.log(resp);
    this.setState({
      questions: resp.data.results,
      activeQuestion: resp.data.results[0],
      displayQuestion: true,
      displayCounter: true,
      initial: false,
      playAgain: false
      })
    })
  }

  nextQuestion = (event) => {
    this.questionCounter++;
    if(this.questionCounter>=this.state.length) {
      this.questionCounter=0;
      this.setState({
        playAgain:true,
        displayCounter:false,
        displayQuestion:false
      })
    }
    else{
      this.setState({
        activeQuestion: this.state.questions[this.questionCounter],
        displayQuestion: true
      })
    }

  }

  correct = (event) => {
    console.log('in correct');
    event.preventDefault();
    this.setState({
      score: this.state.score+10,
      displayQuestion: false,
      answer: true,
      displayResult: true
    })
    setTimeout(() => {
      this.setState({
        displayQuestion: true,
        displayResult: false
      })
      this.nextQuestion()
    },2000)
  }

  incorrect = (event) => {
    event.preventDefault();
    console.log('in incorrect');
    this.setState({
      displayQuestion: false,
      answer: false,
      displayResult: true
    })
    setTimeout(() => {
      this.setState({
        displayQuestion: true,
        displayResult: false
      })
      this.nextQuestion()
    },2000)
  }

  replaceSymbols = (str) => {
    return str.replace(/&quot;/g,`"`).replace(/&#039;/g,"'").replace(/&amp;/g,"&").replace(/&uuml;/g,"ü")
  }

  render() {
    let listArr=[];
    if (this.state.activeQuestion.type==="multiple") {
      let randPosition = Math.floor(Math.random()*4)
      if(randPosition===3){
        for(let i = 0; i<3;i++) {
          listArr.push(<li onClick={this.incorrect}>{this.replaceSymbols(this.state.activeQuestion.incorrect_answers[i])}</li>)
          if (i===2) {
            listArr.push(<li onClick={this.correct}>{this.replaceSymbols(this.state.activeQuestion.correct_answer)}</li>)
          }
        }
      }
      else {
        for(let i = 0; i<3;i++) {
          if (i===randPosition) {
            listArr.push(<li onClick={this.correct}>{this.replaceSymbols(this.state.activeQuestion.correct_answer)}</li>,<li onClick={this.incorrect}>{this.replaceSymbols(this.state.activeQuestion.incorrect_answers[i])}</li>)
          } else {
            listArr.push(<li onClick={this.incorrect}>{this.replaceSymbols(this.state.activeQuestion.incorrect_answers[i])}</li>)
          }
        }
      }
    }
    else {
      if (this.state.activeQuestion.correct_answer==='True') {
        listArr.push(<li onClick={this.correct}>True</li>, <li onClick={this.incorrect}>False</li>)
      } else {
        listArr.push(<li onClick={this.incorrect}>True</li>, <li onClick={this.correct}>False</li>)
      }
    }

    return(
      <FlexWrapper>
        <h1>Bar Triva</h1>
        {this.state.initial?
        <form onSubmit={this.getQuestions}>
          <label>
            Difficulty
            <select onChange={this.handleChange} id = 'length'>
              <option value={10}>Short</option>
              <option value={20}>Medium</option>
              <option value={30}>Long</option>
            </select>
          </label>
          <input type="submit" />
        </form>
        :""}
        <div>{this.state.score}</div>
        {this.state.displayCounter?
          <>
            <div>{this.questionCounter+1}/{this.state.length}</div>
          </>
        :''}
        {this.state.displayQuestion?
          <>
            <p>{this.replaceSymbols(this.state.activeQuestion.question)}</p>
            <ul>{listArr}</ul>
          </>
        :''
        }
        {this.state.displayResult?
          <>
            {this.state.answer?
              <div>
                <p>Congratulations! 10 points to Gryphindor</p>
              </div>
              :
              <div>
                <p>Sorry, the correct answer was {this.state.activeQuestion.correct_answer}</p>
              </div>}
          </>
          : ''}
          {this.state.playAgain?
          <>
            <div>Play again?</div>
            <form onSubmit={this.getQuestions}>
              <label>
                Difficulty
                <select onChange={this.handleChange} id = 'length'>
                  <option value={10}>Short</option>
                  <option value={20}>Medium</option>
                  <option value={30}>Long</option>
                </select>
              </label>
              <input type="submit" />
            </form>
          </> : ""}

      </FlexWrapper>
    )
  }
}
