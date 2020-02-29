import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { HashRouter, NavLink, Route } from 'react-router-dom';
import Home from './sub-apps/utilities/Home';
import BarTrivia from './sub-apps/bar-trivia/BarTrivia';
import MathDrills from './sub-apps/math-drills/MathDrills'
import Matching from './sub-apps/matching/Board'
import Adventure from './sub-apps/adventure/Adventure'
import Weather from './sub-apps/weather/Weather'
// import BlockQuest from '.sub-apps/block-quest/main'
// import SignUpForm from './sub-apps/utilities/SignUpForm';
// import LogInForm from './sub-apps/utilities/LogInForm';
// import LogOut from './sub-apps/utilities/LogOut';

const H1 = styled.h1`
	text-align:center;
`;

const Nav = styled.nav`
	display: flex;
	justify-content: center;
	text-decoration: none;
	color: red;
`;

export default class MainRouter extends Component {
	// constructor() {
	// 	super();
	// 	this.state = {
	// 		username: '',
	// 		password: '',
	// 		isLoggedIn: false,
	// 	};
	// }
	// componentDidMount() {
	// 	if (localStorage.token) {
	// 		this.setState({
	// 			isLoggedIn: true,
	// 		});
	// 	} else {
	// 		this.setState({
	// 			isLoggedIn: false,
	// 		});
	// 	}
	// }

	render() {
		return (
			<React.Fragment>
			<H1>Wirhal Family Utilites</H1>
				<HashRouter>
					<header>
						<Nav>
							<NavLink
								className='navlink'
								exact
								to="/"
							>
								Home
							</NavLink>
              <NavLink
								className='navlink'
                exact
                to="/bar-trivia"
              >
                Bar Trivia
              </NavLink>
              <NavLink
								className='navlink'
                exact
                to="/math-drills"
              >
                Math Drills
              </NavLink>
							<NavLink
								className='navlink'
								exact
								to="/matching"
							>
								Matching
							</NavLink>
							<NavLink
								className='navlink'
							exact
							to="/adventure"
							>
							Adventure
							</NavLink>
							<NavLink
							className='navlink'
							exact
							to="/weather"
							>
							Weather
							</NavLink>
						</Nav>
					</header>
					<div
						// className={Route.to === '/my-plots' ? '' : 'app-container'}
						className={'site-container'}
					>
						<Route path="/" exact component={Home} />

					</div>
						<Route path="/bar-trivia" component={BarTrivia} />
						<Route path="/math-drills" component={MathDrills} />
						<Route path="/matching" component={Matching} />
						<Route path="/adventure" component={Adventure} />
						<Route path="/weather" component={Weather} />
				</HashRouter>
			</React.Fragment>
		);
	}
}
