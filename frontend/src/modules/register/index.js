import React, { Component } from "react";
import "./style.scss";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";

@inject("routing", "registerStore", "registerService")
@withRouter
@observer
class Register extends Component {

    handleRegister = async () => {
        const isSuccess = await this.props.registerStore.register();
        if(isSuccess) {
            this.props.routing.push("/login");
        }else {
            this.props.registerStore.clear();
        }
    }

  handleChange = (event) => {
    this.props.registerStore.onChange(event.target.name, event.target.value);
  }

    render() {
        return (
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                            <div className="card card-signin my-5">
                                <div className="card-body center">
                                    <img src="https://uppic.cc/d/YxX" alt=""/>
                                    <h5 className="card-title text-center">Register</h5>
                                    <div className="form-signin">
                                        <div className="form-label-group">
                                            <input
                                            type="text"
                                            id="inputName"
                                            className="form-control"
                                            placeholder="Name"
                                            name="name"
                                            onChange={this.handleChange}
                                            value={this.props.registerStore.name}
                                            />
                                        </div>
                                        <div className="form-label-group">
                                            <input
                                            type="email"
                                            id="inputEmail"
                                            className="form-control"
                                            placeholder="Email address"
                                            name="email"
                                            onChange={this.handleChange}
                                            value={this.props.registerStore.email}
                                            />
                                        </div>
                                        <div className="form-label-group">
                                            <input
                                            type="password"
                                            id="inputPassword"
                                            className="form-control"
                                            placeholder="Password"
                                            name="password"
                                            onChange={this.handleChange}
                                            value={this.props.registerStore.password}
                                            />
                                        </div>
                                        <button className="btn btn-lg btn-warning btn-block text-uppercase"
                                        type="submit"
                                        onClick={this.handleRegister}>
                                            SUBMIT
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
  
export default Register;