import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SpotifyPlayer from 'react-spotify-web-playback';
import { 
	spotifySearchURL,
	spotifyPlaylistURL
} from '../helper/constants';
import {
  Container, 
  Row,
  Col,
  Image,
  Navbar,
  Form,
  Button,
  FormControl,
  Card,
  CardColumns
} from 'react-bootstrap';

export default class Study extends Component {
	constructor(props) {
		super(props);
		this.state = {
			current_user: [],
			auth: [],
			query: '',
			tracks: []
		}
	}

	componentDidMount = () => {
		// Check that logged in
		const { current_user, auth,tracks } = this.props.location.state;
		if (current_user && auth) {
			this.setState({
				current_user,
				auth,
				tracks
			})
		} else {
			this.props.history.push('/')
		}
	}

	studyTrack = (t) => {
		if (t != undefined) {
			console.log(t.track.uri)
			return <SpotifyPlayer
			  token={ this.state.auth }
			  uris={['spotify:track:6WBTeFDEfAJbaSUUc1V1xQ']}
			/>;
		} else {
			return <p></p>
		}
	}


	render() {
		const { images, display_name } = this.props.location.state.current_user.user;
		const noPlaylist = (
			<div>
				<h3 style={{color: "grey"}}> No playlist selected. Try again <a href='/'>here</a></h3>
			</div>
			)
		return (
			<Container>
				<Navbar bg="light" >
					<Navbar.Brand href="/">Smookify</Navbar.Brand>
				</Navbar>
				<Row className="justify-content-md-center" style={{paddingTop:"50px"}}>
					{ this.state.tracks ? this.studyTrack(this.state.tracks[0]) : noPlaylist }
				</Row>
			</Container>
		);
	}
}