import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import Home from '../modules/home';

class AppRouter extends React.Component {
	render() {
		return (
			<Router history={this.props.history}>
				<Switch>
					<Route path="/" component={Home} />
				</Switch>
			</Router>
		);
	}
}

export default AppRouter;
