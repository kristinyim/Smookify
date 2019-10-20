import React, { Component } from 'react';
import logo from '../img/logo.svg';
import '../css/App.css';
import axios from 'axios';
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
      <div>
        <p>
          {this.state.authorized
            ? "Authorized. Enter below"
            : "Click below to authorize our Spotify account"}
        </p>
        <button
          type="button"
          onClick={this.handleAuthFlow}>
          {this.state.authorized
            ? "Proceed to Smookify"
            : "Sign in with Spotify"}
        </button>
      </div>
    );
  }
};