import React, { Component } from 'react';
import axios from 'axios';

class LogInForm extends Component {
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
	handleInput = e => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};
	handleLogIn = e => {
		e.preventDefault();
		axios
			.post('/api/users/login', {
				username: this.state.username,
				password: this.state.password,
			})
			.then(response => {
				localStorage.setItem('token', response.data.token);
				this.setState({
					isLoggedIn: true,
				});
			})
      .catch(err => console.log(err));
      this.props.history.push("/");
	};
	render() {
		return (
			<div className="auth-container">
				<h2 className="page-header">Log In</h2>
				<form onSubmit={this.handleLogIn} method="POST">
					<span>
						<label htmlFor="username">Username</label>
						<input
							className="basic-slide"
							type="text"
							name="username"
							onChange={this.handleInput}
						/>
					</span>
					<span>
						<label htmlFor="password">Password</label>
						<input
							className="basic-slide"
							type="text"
							name="password"
							onChange={this.handleInput}
						/>
					</span>
					<input value="Submit" type="submit" />
				</form>
        <br />
        <a href='/#/signup'>Sign Up</a>
			</div>
		);
	}
}

export default LogInForm;
