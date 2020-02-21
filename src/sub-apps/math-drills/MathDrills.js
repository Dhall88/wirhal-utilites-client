import React, { Component } from 'react'

import Numbers from './Numbers.js'
import Addition from './Addition.js'
import Subtraction from './Subtraction.js'
import Multiplication from './Multiplication.js'
import Division from './Division.js'
import OrderOfOperations from './OrderOfOperations.js'
import Audio from '../utilities/Audio.js'

export default class MathDrills extends Component {
  state = {
    difficulty:2,
    type:0,
    showComponent: false,
  }
  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value ,showComponent:true})
  }
  // handleSubmit = (event) => {
  //   event.preventDefault();
  //   this.setState({
  //     showComponent:true
  //   })
  // }
  render() {
    const typeArr = [Numbers, Addition, Subtraction, Multiplication, Division, OrderOfOperations]
    const Type = typeArr[this.state.type]
    return(
      <div>
      <form onSubmit={this.handleSubmit}>
        <label>
          Difficulty
          <select onChange={this.handleChange} id = 'difficulty'>
            <option value={2}>Easy</option>
            <option value={3}>Medium</option>
            <option value={5}>Hard</option>
          </select>
        </label>
        <label>
          Type
          <select onChange={this.handleChange} id = 'type'>
            <option value={0}>Numbers</option>
            <option value={1}>Addition</option>
            <option value={2}>Subtration</option>
            <option value={3}>Multiplication</option>
            <option value={4}>Division</option>
            <option value={5}>Order Of Operations</option>
          </select>
        </label>
        <input type="submit" />
      </form>
        {this.state.showComponent?
          <Type difficulty={this.state.difficulty}/>
          :''
        }
        <Audio />

      </div>
    )
  }
}
