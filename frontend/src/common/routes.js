import React from "react";
import { Switch, Route, Router } from "react-router-dom";
import Home from "../modules/home"
import Login from "../modules/login";
import Register from "../modules/register";

class AppRouter extends React.Component {
	render() {
		return (
			<Router history={this.props.history}>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/login" component={Login} />
					<Route path="/register" component={Register} />
				</Switch>
			</Router>
		);
	}
}

export default AppRouter;
