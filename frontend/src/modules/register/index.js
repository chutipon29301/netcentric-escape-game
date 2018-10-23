import React, { Component } from "react";
import "./style.scss";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";

@inject("routing")
@withRouter
@observer
class Register extends Component {
  handleSubmit() {
    this.props.routing.push("/login");
  }
  render() {
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
              <div className="card card-signin my-5">
                <div className="card-body center">
                  <img
                    src="http://breakout.gamemiles.com/content/images/thumbs/0161767_580.jpeg"
                    alt=""
                  />
                  <h5 className="card-title text-center">Register</h5>
                  <form className="form-signin">
                    <div className="form-label-group">
                      <input
                        type="text"
                        id="inputName"
                        className="form-control"
                        placeholder="Name"
                      />
                    </div>

                    <div className="form-label-group">
                      <input
                        type="email"
                        id="inputEmail"
                        className="form-control"
                        placeholder="Email address"
                      />
                    </div>

                    <div className="form-label-group">
                      <input
                        type="password"
                        id="inputPassword"
                        className="form-control"
                        placeholder="Password"
                      />
                    </div>
                    <button
                      className="btn btn-lg btn-primary btn-block text-uppercase"
                      type="submit"
                      onClick={()=>this.handleSubmit()}
                    >
                      SUBMIT
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

export default Register;
