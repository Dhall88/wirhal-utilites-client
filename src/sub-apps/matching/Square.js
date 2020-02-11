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
    if(this.state.flipped===''){
    this.setState({
      flipped:'flipped'
    })
  } else {
    this.setState({
      flipped:''
    })

    setTimeout(()=>console.log(this.state.flipped),50)

  }
  }
 render() {
  return(
   <div onClick={this.flip} id={this.state.flipped}className={`card-container ${this.state.flipped}`}>
    <div className='card-body'>
     <SquareBack />

     <SquareFront />
    </div>
   </div>
  )
 }
}

// Render Card component
