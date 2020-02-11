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
    matchBoolean:false
  }
  childRef=React.createRef();
  childRef1=React.createRef();
  symbolArr=['x','o']

  callback = (childData) => {

      this.setState({
        stored: [...this.state.stored, childData]
      })
      setTimeout(()=>{
        let stored = this.state.stored
        if (stored[0]===stored[1]) {
          this.setState({
            matchBoolean:true
          })
        }
      },5)
}
  render() {
    return(
      <>
        {this.state.matchBoolean===true?
        <div classNamme='matched'>YOU GOT A MATCH</div>:''}
        <div>
        <Square ref={this.childRef} id={this.childRef} symbol={this.symbolArr[0]} parentCallback={this.callback}/>
        </div>
        <div>
        <Square ref={this.childRef1} id={this.childRef1} symbol={this.symbolArr[1]} parentCallback={this.callback}/>
        </div>
      </>
    )
  }
}
