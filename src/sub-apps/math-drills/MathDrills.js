import React, { Component } from 'react'

import Numbers from './Numbers.js'
import Addition from './Addition.js'
import Subtraction from './Subtraction.js'
import Multiplication from './Multiplication.js'
import Division from './Division.js'
import OrderOfOperations from './OrderOfOperations.js'

export default class MathDrills extends Component {
  state = {
    difficulty:'',
    type:0,
    showComponent: false,
  }
  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value })
  }
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      showComponent:true
    })
  }
  render() {
    const typeArr = [Numbers, Addition, Subtraction, Multiplication, Division, OrderOfOperations]
    const Type = typeArr[this.state.type]
    return(
      <div>
      <form onSubmit={this.handleSubmit}>
        <label>
          Difficulty
          <select onChange={this.handleChange} id = 'difficulty'>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
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
          <Type />
          :''
        }


      </div>
    )
  }
}
