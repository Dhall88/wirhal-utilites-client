import React, { Component } from 'react';
import styled from 'styled-components';
import Audio from './Audio'

const FlexWrapper=styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50%;
  margin: auto;
  text-align: center;
  font-size: 30px;
`;

export default class Home extends Component {
	render() {
		return (
			<FlexWrapper>
      	<h1>Home</h1>
				<h3>Inspired by my family, for my family, Wirhal Family Utilities is a collection of apps and games.</h3>

			</FlexWrapper>
		);
	}
}
