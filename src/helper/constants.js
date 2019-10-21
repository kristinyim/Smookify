import {
  clientID,
  clientSecret
} from "./secrets";

let prod = false;

const scopes = "user-read-private+user-read-email+playlist-read-private+user-top-read+user-read-recently-played";
const redirectURI = prod ? "http://kristinstrawberryyim.com/smookify" : "http://localhost:3000/";

export const spotifyWebApiURL = `https://accounts.spotify.com/authorize/?client_id=${clientID
}&response_type=token&redirect_uri=${redirectURI}&scope=${scopes}`;
export const spotifyProfileURL = "https://api.spotify.com/v1/me?access_token=";
export const spotifySearchURL = "https://api.spotify.com/v1/search?q=";
export const spotifyPlaylistURL = "https://api.spotify.com/v1/playlists/";