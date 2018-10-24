import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import Start from '../modules/start';
import Login from '../modules/login';
import Register from '../modules/register';
import WaitingRoom from '../modules/waitingRoom';


class AppRouter extends React.Component {
	render() {
		return (
			<Router history={this.props.history}>
				<Switch>
					<Route exact path="/" component={Start} />
					<Route path="/login" component={Login} />
					<Route path="/register" component={Register} />
					<Route path="/waiting" component={WaitingRoom}/>
				</Switch>
			</Router>
		);
	}
}

export default AppRouter;
