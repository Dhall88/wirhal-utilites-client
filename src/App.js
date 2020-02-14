import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, NavLink, Route } from 'react-router-dom';
import Home from './sub-apps/utilities/Home';
import BarTrivia from './sub-apps/bar-trivia/BarTrivia';
import MathDrills from './sub-apps/math-drills/MathDrills'
import Matching from './sub-apps/matching/Board'
import Adventure from './sub-apps/adventure/Adventure'
import Weather from './sub-apps/weather/Weather'
import Chess from './sub-apps/chess/Chess'
// import BlockQuest from '.sub-apps/block-quest/main'
// import SignUpForm from './sub-apps/utilities/SignUpForm';
// import LogInForm from './sub-apps/utilities/LogInForm';
// import LogOut from './sub-apps/utilities/LogOut';

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
				<HashRouter>
					<header>
            <nav className="navbar-light bg-light row">
							<NavLink
								exact
								to="/"
								activeClassName="is-active"
								className="nav-item m-2"
							>
								Home
							</NavLink>
              <NavLink
                exact
                to="/bar-trivia"
                activeClassName="is-active"
                className="nav-item m-2"
              >
                Bar Trivia
              </NavLink>
              <NavLink
                exact
                to="/math-drills"
                activeClassName="is-active"
                className="nav-item m-2"
              >
                Math Drills
              </NavLink>
							<NavLink
								exact
								to="/matching"
								activeClassName="is-active"
								className="nav-item m-2"
							>
								Matching
							</NavLink>
							<NavLink
							exact
							to="/adventure"
							activeClassName="is-active"
							className="nav-item m-2"
							>
							Adventure
							</NavLink>
							<NavLink
							exact
							to="/weather"
							activeClassName="is-active"
							className="nav-item m-2"
							>
							Weather
							</NavLink>
							<NavLink
							exact
							to="/chess"
							activeClassName="is-active"
							className="nav-item m-2"
							>
							Chess
							</NavLink>
						</nav>
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
						<Route path="/chess" component={Chess} />
				</HashRouter>
			</React.Fragment>
		);
	}
}
