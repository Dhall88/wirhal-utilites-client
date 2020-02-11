import React, { Component } from 'react'
import Flippy, {FrontSide,BackSide} from 'react-flippy';
// import SquareBack from './SquareBack.js'
// import SquareFront from './SquareFront.js'
import Square from './Square.js'
import '../../sass/matching.scss'

export default class Board extends React.Component {
  state={
    message:''
  }
  callbackFunction = (childData) => {
      this.setState({message: childData})
}
  render() {
    return(
      <>
      <div>{this.state.message}</div>
      <Square parentCallback={this.callbackFunction}/>
      </>
    )
  }
}
