import React, { Component } from 'react'
import SquareFront from './SquareFront'
import SquareBack from './SquareBack'

// React component for the card (main component)
export default class Square extends Component {
  state={
    flipped:''

  }

  flip = (event) => {
    event.preventDefault()
    this.setState({
      flipped:'flipped'
    })
    this.props.parentCallback(this.props.symbol)
  }


  // sendData = () => {
  //   this.props.parentCallback("HEYYYYY")
  // }


 render() {
  return(
   <div onClick={this.state.flipped===''?this.flip:''} id={this.state.flipped}className={`card-container ${this.state.flipped}`}>
    <div className='card-body'>
     <SquareBack symbol={this.props.symbol} />

     <SquareFront />
    </div>
   </div>
  )
 }
}

// Render Card component
