import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import Start from '../modules/start';
import Login from '../modules/login';

class AppRouter extends React.Component {
	render() {
		return (
			<Router history={this.props.history}>
				<Switch>
					<Route exact path="/" component={Start} />
					<Route path="/login" component={Login} />
				</Switch>
			</Router>
		);
	}
}

export default AppRouter;
