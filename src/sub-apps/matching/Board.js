import React, { Component } from 'react'
import Flippy, {FrontSide,BackSide} from 'react-flippy';
// import SquareBack from './SquareBack.js'
// import SquareFront from './SquareFront.js'
import Square from './Square.js'
import '../../css/matching.css'

export default class Board extends Component {
  state={
    message:'',
    stored:[],
    matchBoolean:false,
    refIndex:[],
    numSquares:0,
    width:300,
    difficulty:"8",
    scale: 3,
    symbols:[],
    squares:[],
    matches:0,
    totalMatches:4
  }
  childRef0=React.createRef();childRef1=React.createRef();childRef2=React.createRef(); childRef3=React.createRef();
  childRef4=React.createRef(); childRef5=React.createRef();childRef6=React.createRef(); childRef7=React.createRef();
  childRef8=React.createRef(); childRef9=React.createRef();childRef10=React.createRef(); childRef11=React.createRef();
  childRef12=React.createRef(); childRef13=React.createRef();childRef14=React.createRef(); childRef15=React.createRef();

  symbolArr=['c','c','p','p','a','a','g','g','x','x','o','o','b','b','w','w']
  difficulty="0"
  squares=[]
  symbols=[]

  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.squares=[];
    this.symbols=[];
    console.log(this.squares);
    console.log(this.state.difficulty);
    this.difficulty=this.state.difficulty
    this.symbols = this.symbolArr.slice(0,this.difficulty)
    this.symbols = this.symbols.sort(function() {
      return .5 -Math.random()
    })
    console.log(this.symbols);

    for(let i = 0;i<this.difficulty;i++) {
      this.squares.push(
          <Square ref={this[`childRef${i}`]} id={i} symbol={this.symbols[i]} parentCallback={this.callback}/>
      )
    }
    this.setState({
      squares:this.squares,
      totalMatches:this.difficulty/2,

    })

  }

  playAgain = () => {
    window.location.reload(false);
  }


  callback = (childSymbol, childId) => {
    console.log(childSymbol);
      this.setState({
        stored: [...this.state.stored, childSymbol],
        refIndex: [...this.state.refIndex, childId]
      })

      setTimeout(()=>{
        let stored = this.state.stored
        let refs = [...this.state.refIndex]
        if (stored.length===2){
          if (stored[0]===stored[1]) {
            this.setState({
              matchBoolean:true,
              stored:[],
              refIndex:[],
              matches: this.state.matches+1
            })
          } else {
            setTimeout(()=>{
            this[`childRef${refs[0]}`].current.flip(true)
            this[`childRef${refs[1]}`].current.flip(true)
            this.setState({
              matchBoolean:false,
              stored: [],
              refIndex: [],
            })
          },1000)
          }
      }
    },1)
}

// reset = () => {
//   this.
// }
  render() {

    return(
      <>
      <form onSubmit={this.handleSubmit}>
        <label>
          Difficulty
          <select onChange={this.handleChange} id = 'difficulty'>
            <option value={8}>Easy</option>
            <option value={12}>Medium</option>
            <option value={16}>Hard</option>
          </select>
          <input type='submit' />
        </label>
        </form>
        {this.state.matchBoolean===true?
        <div classNamme='matched'>YOU GOT A MATCH</div>:''}
        <div  className='flex'>
        {this.state.squares}
        </div>
        {this.state.totalMatches===this.state.matches?
          <div onClick={this.playAgain}>PLAY AGAIN</div>:''}2
      </>
    )
  }
}
