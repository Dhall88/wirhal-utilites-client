import React, { Component } from 'react';
import axios from 'axios';

class LogOut extends Component {
	constructor(props) {
		super(props)
	  }
	componentDidMount() {
		if (localStorage.token) {
			this.setState({
				isLoggedIn: true,
			});
		} else {
			this.setState({
				isLoggedIn: false,
			});
		}
	}

	handleLogOut = (e) => {
		e.preventDefault();
		this.setState({
			username: '',
			password: '',
			isLoggedIn: false,
		});
		localStorage.clear();
		this.props.history.push("/");
	};

	render() {
		return (
			<div className="auth-container">
				<h2 className="page-header">Log Out</h2>

				<form onSubmit={this.handleLogOut}>
					<input value="Log Out" type="submit" />
				</form>
			</div>
		);
	}
}

export default LogOut;
