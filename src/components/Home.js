import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			current_user: [],
			auth: []
		}
	}

	componentDidMount = () => {
		// Check that logged in
		const { current_user, auth } = this.props.location.state;
		if (current_user && auth) {
			this.setState({ current_user, auth})
		} else {
			this.props.history.push('/')
		}
	}

	render() {
		return <div><p>hi</p></div>
	}
}