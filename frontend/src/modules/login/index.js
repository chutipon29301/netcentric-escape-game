import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./style.scss";

@inject("routing", "loginStore", "loginService")
@withRouter
@observer
class Login extends Component {

    constructor(props) {
        super(props);
    }

    handleSignIn = async () => {
        const token = await this.props.loginStore.login();
        if (token) {
            this.props.routing.push("/waitingRoom");
        }
    }

    handleChange = (event) => {
        this.props.loginStore.onChange(event.target.name, event.target.value);
    }

    routeToRegister = () => {
        this.props.routing.push("/register");
    }

    render() {
        return (
            <div className="login">
                <div className="container">
                <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <div className="card card-signin my-5">
                        <div className="card-body center">
                        <img src="https://uppic.cc/d/YxX" alt="" />
                        <h5 className="card-title text-center">Sign In</h5>
                        <div className="form-signin">
                            <div className="form-label-group">
                            <input
                                type="email"
                                id="inputEmail"
                                name="email"
                                className="form-control"
                                placeholder="Email address"
                                onChange={this.handleChange}
                                value={this.props.loginStore.email}
                            />
                            </div>
                            <div className="form-label-group">
                            <input
                                type="password"
                                id="inputPassword"
                                name="password"
                                className="form-control"
                                placeholder="Password"
                                onChange={this.handleChange}
                                value={this.props.loginStore.password}
                            />
                            </div>
                            <button
                            className="btn btn-lg btn-warning btn-block text-uppercase"
                            onClick={this.handleSignIn}
                            >
                            Sign in
                            </button>
                            <button
                            className="btn btn-lg btn-warning btn-block text-uppercase fade"
                            onClick={this.routeToRegister}
                            >
                            Register
                            </button>
                        </div>
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
