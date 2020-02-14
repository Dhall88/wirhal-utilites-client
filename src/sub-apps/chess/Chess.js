import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Board from './Board'
import { observe } from './Game'



export default class Chess extends Component {

  componentDidUpdate() {

    const chess = document.getElementById('chess')

    this.refs.chess.appendChild(observe(knightPosition => (<Board knightPosition={knightPosition} />)).domElement)
  }
  render(){
    return(
      <div ref='chess'>
      </div>
    )

  }
}
