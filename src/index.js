import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const appRoutes = [
	{
		exact: true,
		path: "/",
		component: App
	}
]


class Routes extends Component {

	constructor(props) {
		super(props);
		this.state = {

		};
	}

	renderRoutes = (routes) => {
		let allRoutes = [];
		routes.map((route,index) => {
			let exact = route.exact ? true : false;
			allRoutes.push(
				<Route
					exact={exact}
					path={route.path}
					component={route.component}
					key={index}
					{...this.props}
				/>
			)
		})
		return allRoutes;
	}
	render(){
		return <div>{this.renderRoutes(appRoutes)}</div>
	}
}

ReactDOM.render((
	<BrowserRouter>
		<Routes />
	</BrowserRouter>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
