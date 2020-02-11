import React, { Component } from 'react'
import SquareFront from './SquareFront'
import SquareBack from './SquareBack'

// React component for the card (main component)
export default class Square extends Component {
  state={
    flipped:''

  }

  flip = (reset=false) => {
    if(this.state.flipped==='') {
    this.setState({
      flipped:'flipped'
    })}
    else {
      this.setState({
        flipped:''
      })
    }
    if (reset===false) {
      this.props.parentCallback(this.props.symbol,this.props.id)
    }
  }


  // sendData = () => {
  //   this.props.parentCallback("HEYYYYY")
  // }


 render() {
  return(
   <div onClick={this.state.flipped===''?()=>this.flip(false):''} id={this.state.flipped}className={`card-container ${this.state.flipped}`}>
    <div className='card-body'>
     <SquareBack symbol={this.props.symbol} />

     <SquareFront />
    </div>
   </div>
  )
 }
}

// Render Card component
