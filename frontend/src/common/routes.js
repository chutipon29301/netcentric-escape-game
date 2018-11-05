import React from "react";
import { Switch, Route, Router } from "react-router-dom";
import Home from "../modules/home"
import Login from "../modules/login";

class AppRouter extends React.Component {
	render() {
		return (
			<Router history={this.props.history}>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/login" component={Login} />
				</Switch>
			</Router>
		);
	}
}

export default AppRouter;
