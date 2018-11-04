import React, { Component } from "react";
import "./style.scss";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import Axios from "../../axiosConfig";

@inject("routing", "login")
@withRouter
@observer
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    Axios({
      method: "post",
      url: "/token",
      data: this.state
    }).then(res => {
        localStorage.setItem("playerToken",res.data.token);
        console.log("playerToKennnnnnn",localStorage.getItem("playerToken"))
        // this.props.login.setToken(res.data.token);
        this.props.routing.push("/waiting");
      })
      .catch(error => {
        console.log(error.response);
        alert("Cannot login");
      })
      .finally(() => {
        this.setState({
          email: "",
          password: ""
        });
      });
  }

  handleRegister() {
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
                  <form className="form-signin">
                    <div className="form-label-group">
                      <input
                        type="email"
                        id="inputEmail"
                        name="email"
                        className="form-control"
                        placeholder="Email address"
                        onChange={this.handleChange}
                        value={this.state.email}
                        // required
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
                        value={this.state.password}
                        // required
                      />
                    </div>
                    <button
                      className="btn btn-lg btn-warning btn-block text-uppercase"
                      type="submit"
                      onClick={this.handleSubmit}
                    >
                      Sign in
                    </button>

                    <button
                      className="btn btn-lg btn-warning btn-block text-uppercase fade"
                      type="submit"
                      onClick={() => this.handleRegister()}
                      onChange={this.handleChange}
                    >
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
