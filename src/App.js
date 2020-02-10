import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, NavLink, Route } from 'react-router-dom';
import Home from './sub-apps/utilities/Home';
import BarTrivia from './sub-apps/bar-trivia/BarTrivia';
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
						</nav>
					</header>
					<div
						// className={Route.to === '/my-plots' ? '' : 'app-container'}
						className={'site-container'}
					>
						<Route path="/" exact component={Home} />

					</div>
					<div className="app-container">
						<Route path="/bar-trivia" component={BarTrivia} />
					</div>
				</HashRouter>
			</React.Fragment>
		);
	}
}
