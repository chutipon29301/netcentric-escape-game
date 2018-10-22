import React, { Component } from 'react';
import './style.scss';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';

@inject('routing')
@withRouter
@observer
class Login extends Component {
	render() {
		return (
			<div className="login">
				<div className="container">
					<div className="row">
						<div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
							<div className="card card-signin my-5">
								<div className="card-body center">
									<img
										src="http://breakout.gamemiles.com/content/images/thumbs/0161767_580.jpeg"
										alt=""
									/>
									<h5 className="card-title text-center">
										Sign In
									</h5>
									<form className="form-signin">
										<div className="form-label-group">
											<input
												type="email"
												id="inputEmail"
												className="form-control"
												placeholder="Email address"
												// required
											/>
										</div>

										<div className="form-label-group">
											<input
												type="password"
												id="inputPassword"
												className="form-control"
												placeholder="Password"
												// required
											/>
										</div>
										<button
											className="btn btn-lg btn-primary btn-block text-uppercase"
											type="submit"
										>
											Sign in
										</button>

										<button className="btn btn-lg btn-primary btn-block text-uppercase fade">
											Register
										</button>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Login;
