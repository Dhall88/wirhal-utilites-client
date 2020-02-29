import React, { Component } from 'react'
import styled from 'styled-components';
import axios from 'axios';

import Addition from './Addition.js'
import Subtraction from './Subtraction.js'
import Multiplication from './Multiplication.js'
import Division from './Division.js'
import OrderOfOperations from './OrderOfOperations.js'
import Audio from '../utilities/Audio.js'

const Ul=styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const Li=styled.li`
  font-size: 20px;
  padding: 0 0 1em 0;
  margin: 0;
  transition-duration: 0.2s;

  &:hover {
  transform:scale(1.2);
}
`;

const FlexWrapper=styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50%;
  margin: auto;
  text-align: center;
  font-size: 30px;
`;

const Form=styled.form`
  margin: 1em;
`;

const Option=styled.option`
  font-size: 30px;Aa
`;

const Select=styled.select`
  font-size: 30px;
  margin: .5em;
  padding: 0 0 0 z.5em;
`;

const Label=styled.label`
  padding: .5em;
`;

const Input=styled.input`
  font-size:30px;

`;

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
    componentDidMount() {

    }
  render() {
    const typeArr = [Addition, Subtraction, Multiplication, Division]
    const Type = typeArr[this.state.type]
    return(
      <FlexWrapper>
      <h2>Math Drills</h2>
      <Form onSubmit={this.handleSubmit}>
        <Label>
          Difficulty
          <Select onChange={this.handleChange} id = 'difficulty'>
            <Option value={2}>Easy</Option>
            <Option value={3}>Medium</Option>
            <Option value={5}>Hard</Option>
          </Select>
        </Label>
        <Label>
          Type
          <Select onChange={this.handleChange} id = 'type'>
            <Option value={null}>-</Option>
            <Option value={0}>Addition</Option>
            <Option value={1}>Subtration</Option>
            <Option value={2}>Multiplication</Option>
            <Option value={3}>Division</Option>
          </Select>
        </Label>
        <Input type="submit" />
      </Form>
        {this.state.showComponent?
          <Type difficulty={this.state.difficulty}/>
          :''
        }
        <Audio />

      </FlexWrapper>
    )
  }
}
