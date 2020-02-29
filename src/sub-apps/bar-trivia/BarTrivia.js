import React, { Component } from 'react';
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
  padding: .5em;
`;

const Input=styled.input`
  font-size:30px;

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
    initial: true,
    currentHighScore:0
  }
  questionCounter=0

  componentDidMount = () => {
    axios.get('https://opentdb.com/api_token.php?command=request').then(resp => {
      this.setState({
        token: resp.data.token
      })
    })
    axios.get('http://localhost:3000/bar_scores/3').then(resp => {
      console.log(resp);
      if(resp!=undefined) {
      this.setState({
        currentHighScore: resp.data.score
      })
    } else {
      this.setState({
        currentHighScore: 0
      })
    }
    })
  }

  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value ,showComponent:true})
  }

  getQuestions = () => {
    this.updateHighScore()
  axios.get(`http://opentdb.com/api.php?amount=${this.state.length}&token=${this.state.token}`)
  .then(resp => {
    console.log(resp);
    this.setState({
      questions: resp.data.results,
      activeQuestion: resp.data.results[0],
      displayQuestion: true,
      displayCounter: true,
      initial: false,
      playAgain: false,
      score: 0
      })
    })
  }

  updateHighScore = () => {
  console.log('in bar update');
  if(this.state.score>this.state.currentHighScore) {
    fetch('http://localhost:3000/bar_scores/3', {
      body: JSON.stringify({score: this.state.score}),
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
    this.setState({
      currentHighScore: this.state.score
    })
  }
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

  componentWillUnmount() {
    this.updateHighScore();
  }

  render() {
    let listArr=[];
    if (this.state.activeQuestion.type==="multiple") {
      let randPosition = Math.floor(Math.random()*4)
      if(randPosition===3){
        for(let i = 0; i<3;i++) {
          listArr.push(<Li onClick={this.incorrect}>{this.replaceSymbols(this.state.activeQuestion.incorrect_answers[i])}</Li>)
          if (i===2) {
            listArr.push(<Li onClick={this.correct}>{this.replaceSymbols(this.state.activeQuestion.correct_answer)}</Li>)
          }
        }
      }
      else {
        for(let i = 0; i<3;i++) {
          if (i===randPosition) {
            listArr.push(<Li onClick={this.correct}>{this.replaceSymbols(this.state.activeQuestion.correct_answer)}</Li>,<Li onClick={this.incorrect}>{this.replaceSymbols(this.state.activeQuestion.incorrect_answers[i])}</Li>)
          } else {
            listArr.push(<Li onClick={this.incorrect}>{this.replaceSymbols(this.state.activeQuestion.incorrect_answers[i])}</Li>)
          }
        }
      }
    }
    else {
      if (this.state.activeQuestion.correct_answer==='True') {
        listArr.push(<Li onClick={this.correct}>True</Li>, <Li onClick={this.incorrect}>False</Li>)
      } else {
        listArr.push(<Li onClick={this.incorrect}>True</Li>, <Li onClick={this.correct}>False</Li>)
      }
    }

    return(
      <FlexWrapper>
        <h2>Bar Triva</h2>
        {this.state.initial?
        <Form onSubmit={this.getQuestions}>
          <Label>
            Difficulty
            <Select onChange={this.handleChange} id = 'length'>
              <Option value={10}>Short</Option>
              <Option value={20}>Medium</Option>
              <Option value={30}>Long</Option>
            </Select>
          </Label>
          <Input type="submit" />
        </Form>
        :""}
        <div>Current High Score: {this.state.currentHighScore}</div>
        <div>Score: {this.state.score}</div>
        {this.state.displayCounter?
          <>
            <FlexWrapper>{this.questionCounter+1}/{this.state.length}</FlexWrapper>
          </>
        :''}
        {this.state.displayQuestion?
          <>
            <p>{this.replaceSymbols(this.state.activeQuestion.question)}</p>
            <Ul>{listArr}</Ul>
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
                <p>Sorry, the correct answer was {this.replaceSymbols(this.state.activeQuestion.correct_answer)}</p>
              </div>}
          </>
          : ''}
          {this.state.playAgain?
          <>
            <div>Play again?</div>
            <form onSubmit={this.getQuestions}>
              <Label>
                Difficulty
                <Select onChange={this.handleChange} id = 'length'>
                  <Option value={10}>Short</Option>
                  <Option value={20}>Medium</Option>
                  <Option value={30}>Long</Option>
                </Select>
              </Label>
              <Input type="submit" />
            </form>
          </> : ""}

      </FlexWrapper>
    )
  }
}
