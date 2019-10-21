import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
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

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			current_user: [],
			auth: [],
			query: '',
			playlists: [],
			tracks: []
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
					<Card key={p.id} border="success">
					  <Card.Img variant="top" src={hasImage.url} style={{ maxWidth: '150', maxHeight: '150', minHeight: '100' }}/>
					  <Card.Body>
					    <Card.Title>{p.name}</Card.Title>
					    <Card.Text>
					      {p.owner.display_name}
					    </Card.Text>
					    <Button
					    	variant="primary"
					    	onClick={(event) => this.studyPlaylist(event,p.id,p.name)}
					    	>Go somewhere</Button>
					  </Card.Body>
					</Card>
				)
			})
			return <CardColumns md='2'> { results } </CardColumns>
		} else {
			return <p>No results</p>
		}
	}

	studyPlaylist = (event, playlist_id, playlist_name) => {
		event.preventDefault();
		axios.get(`${spotifyPlaylistURL}${playlist_id}/tracks?access_token=${this.state.auth}`)
		.then(response => {
			this.setState({ tracks: response.data.items });
		})
		.then(() => this.props.history.push('/study', {
            current_user: this.state.current_user,
            auth: this.state.auth,
            tracks: this.state.tracks
          }))
        .catch(error => {
          console.log(error);
        });
	}

	render() {
		const { images, display_name } = this.props.location.state.current_user.user;
		const welcome = (
			<div>
				<Row className="justify-content-md-center">
					<Image src={images[0].url} roundedCircle
							style={{
									width:"150px",
									padding: "5px"
								}}
						/>
				</Row>
				<Row className="justify-content-md-center">
					<h1> Welcome { display_name} </h1>
				</Row>
				<Row className="justify-content-md-center">
					<h3 style={{color: "grey"}}> Start searching above to get started</h3>
				</Row>
			</div>
			)
		return (
			<Container>
				<Navbar bg="light" >
					<Navbar.Brand href="/">Smookify</Navbar.Brand>
					<Navbar.Collapse className="justify-content-end">
						<Form inline onSubmit={this.searchPlaylist}>
				    	<FormControl
				    		type="text"
				    		placeholder="Search Playlists"
				    		className="mr-sm-2"
				    		onChange={
									event => {
										this.captureSearch(event.target.value)
									}
								}
							value={this.state.query}
						/>
				    	<Button type="submit">Search</Button>
				    </Form>
					</Navbar.Collapse>
				</Navbar>
				<Row className="justify-content-md-center" style={{paddingTop:"50px"}}>
					{ this.state.playlists.items ? this.showPlaylistResults(this.state.playlists.items) : welcome }
				</Row>
			</Container>
		);
	}
}