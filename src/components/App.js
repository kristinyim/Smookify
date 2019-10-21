import React, { Component } from 'react';
import axios from 'axios';
import {
  Container, 
  Row,
} from 'react-bootstrap';
import {
  spotifyWebApiURL,
  spotifyProfileURL
} from '../helper/constants';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authToken: "",
      authorized: false,
      profile: []
    }
  }

  componentDidMount = () => {
    let url = window.location.href;
    if (url.indexOf("token=") > -1) {
      let authToken = url
        .split("token=")[1]
        .split("&")[0]
        .trim();
      let authorized = true;
      this.setState({ authToken, authorized });
    }
  };

  handleAuthFlow = event => {
    event.preventDefault();

    if (this.state.authorized) {
      const { authToken } = this.state;
      let user;
      axios
        .get(spotifyProfileURL + authToken)
        .then(response => {
          this.setState({ profile: response.data });
          user = response.data;
        })
        .then(() => this.props.history.push('/home', {
            current_user: { user },
            auth: { authToken }
          }))
        .catch(error => {
          console.log(error);
          window.location.assign(spotifyWebApiURL);
        });
    } else {
      window.location.assign(spotifyWebApiURL);
    }
  }

  render() {
    return (
       <Container>
        <Row>
          <h1> Smookify: Study for Pop@Hop </h1>
        </Row>
        <Row>
          <p className="display-5">
              {this.state.authorized
                ? "Successfully authorized! Click below to Enter!"
                : "Just click the button below to authorize your Spotify account to start using React Spotify!"}
          </p>
        </Row>
        <Row>
          <button
            type="button"
            className="btn btn-outline-success"
            onClick={this.handleAuthFlow}
          >
            {this.state.authorized
              ? "Proceed to Smookify"
              : "Sign in with Spotify"}
          </button>
        </Row>
      </Container>
    );
  }
};