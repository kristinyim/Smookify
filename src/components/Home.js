import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Card } from './Card';
import { spotifySearchURL } from '../helper/constants';

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			current_user: [],
			auth: [],
			query: '',
			playlists: []
		}
	}

	componentDidMount = () => {
		// Check that logged in
		const { current_user, auth } = this.props.location.state;
		if (current_user && auth) {
			this.setState({
				current_user,
				auth: auth.authToken
			})
		} else {
			this.props.history.push('/')
		}
	}

	searchPlaylist = (event) => {
		event.preventDefault();
		let playlists;
		axios.get(`${spotifySearchURL}${this.state.query}&type=playlist&access_token=${this.state.auth}`)
		.then(response => {
			playlists = response.data.playlists;
			this.setState({playlists});
		})
		.catch(error => {
			console.log("no results");
		})
	}

	captureSearch = (searchTerm) => {
		this.setState({ query: searchTerm })
	}

	showPlaylistResults = (playlists) => {
		if (playlists != undefined) {
			let results = []
			playlists.map((p, index) => {
				let hasImage = p.images[0];
				results.push(
					<Card
						name={p.name}
						id={p.id}
						key={index}
						imageURL={hasImage.url}
					/>
				)
			})
			return results
		} else {
			return <p>No results</p>
		}
	}

	render() {
		return (
			<div>
				<p>hi</p>
				<form onSubmit={this.searchPlaylist}>
					<input
						type="text"
						placeholder="enter playlist name"
						onChange={
							event => {
								this.captureSearch(event.target.value)
							}
						}
						value={this.state.query}
					/>
					<button
						type="submit"
					>
						Submit
					</button>
				</form>
				{this.showPlaylistResults(this.state.playlists.items)}
			</div>
		);
	}
}