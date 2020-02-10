import React, { Component } from 'react'

export default class MathDrills extends Component {
  state = {
    difficulty:'',
    type:''
  }
  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value })
  }
  handleSubmit = (event) => {
    event.preventDefault();
  }
  render() {
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
            <option value="Numbers">Numbers</option>
            <option value="Addtion">Arithemtic</option>
            <option value="Subtration">Subtration</option>
            <option value="Multiplication">Multiplication</option>
            <option value="Division">Division</option>
            <option value="OrderOfOperations">Order Of Operations</option>
          </select>
        </label>
        <input type="submit" />
        </form>

      </div>
    )
  }
}
