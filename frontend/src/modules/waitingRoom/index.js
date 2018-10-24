import React, { Component } from "react";
import "./style.scss";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import WaitingModal from './components/WaitingModal';

@inject("routing","waitingRoom")
@withRouter
@observer
class WaitingRoom extends Component {
  // handleSubmit() {
  //   this.props.routing.push("/login");
  // }

  state = {
    showWaitingModal: false
  }

  render() {
    console.log(this.state.showWaitingModal);

    return (
      <div className="waiting-room">
        <div className="container h-100">
          <div className="row h-100">
            <div className="col-lg-12">
              <div className="panel panel-default">
                <div className="panel-heading"><h1>Friend List</h1></div>
                <div className="panel-body">
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>No.</th>
                          <th>Name</th>
                          <th>Email</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.props.waitingRoom.friends.map((e,i) => (
                          <tr 
                            key={i}
                            onClick={() => {
                              this.props.waitingRoom.setCurrentFriend({
                                name: e.name,
                                email: e.email
                              });
                              this.setState({ showWaitingModal: true })
                            }}
                          >
                            <td>{i + 1}</td>
                            <td>{e.name}</td>
                            <td>{e.email}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <WaitingModal 
          active={this.state.showWaitingModal}
          close={() => {
            this.setState({ showWaitingModal: false });
            this.props.waitingRoom.setMyReady(false)
          }}
        />
      </div>
    );
  }
}

export default WaitingRoom;
