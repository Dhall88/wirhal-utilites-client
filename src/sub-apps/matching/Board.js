import React, { Component } from 'react'
import Flippy, {FrontSide,BackSide} from 'react-flippy';
// import SquareBack from './SquareBack.js'
// import SquareFront from './SquareFront.js'
import Square from './Square.js'
import '../../sass/matching.scss'

export default class Board extends Component {
  state={
    message:'',
    stored:[],
    matchBoolean:false,
    refIndex:[],
    numSquares:0,
    width:300,
    difficulty:"8",
    scale: 3
  }

  childRef0=React.createRef();childRef1=React.createRef();childRef2=React.createRef(); childRef3=React.createRef();
  childRef4=React.createRef(); childRef5=React.createRef();childRef6=React.createRef(); childRef7=React.createRef();
  childRef8=React.createRef(); childRef9=React.createRef();childRef10=React.createRef(); childRef11=React.createRef();
  childRef12=React.createRef(); childRef13=React.createRef();childRef14=React.createRef(); childRef15=React.createRef();
  symbolArr=['x','y','p','o','a','b','g','w']

  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value })
  }


  callback = (childSymbol, childId) => {

      this.setState({
        stored: [...this.state.stored, childSymbol],
        refIndex: [...this.state.refIndex, childId]
      })

      setTimeout(()=>{
        let stored = this.state.stored
        let refs = [...this.state.refIndex]
        console.log(refs);
        if (stored.length===2){
          if (stored[0]===stored[1]) {
            this.setState({
              matchBoolean:true,
              stored:[],
              refIndex:[]
            })
          } else {
            setTimeout(()=>{
            this[`childRef${refs[0]}`].current.flip(true)
            this[`childRef${refs[1]}`].current.flip(true)
            this.setState({
              matchBoolean:false,
              stored: [],
              refIndex: []
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
    let squares=[];
    for(let i = 0;i<this.state.difficulty;i++) {
      squares.push(
          <Square ref={this[`childRef${i}`]} id={i} symbol={this.symbolArr[Math.floor(i/2)]} parentCallback={this.callback}/>
      )
    }

    squares.sort(function (a, b) { return 0.5 - Math.random() })
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
          <input type='submit'/>
        </label>
        </form>
        {this.state.matchBoolean===true?
        <div classNamme='matched'>YOU GOT A MATCH</div>:''}
        <div  className='flex'>
        {squares}
        </div>
      </>
    )
  }
}
