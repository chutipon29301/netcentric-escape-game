import React, { Component } from "react";
import "./style.scss";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import WaitingModal from './components/WaitingModal';

@inject("routing","lobbyStore")
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
    return (
      <div className="waiting-room">
        <div className="container h-100">
          <div className="row h-100">
          <div className="col-lg-6">
              <div className="panel panel-default">
                <div className="panel-heading"><h1>Create Room</h1></div>
                <div className="panel-body">
                  <div className="md-form">
                    <div className="row mb-lg-3">
                      <div className="col col-lg-6 col-centered">
                        <input type="text" id="room-name" className="form-control" placeholder="Room name" />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col col-lg-12 col-centered mt-3 mt-lg-1 mb-5">
                        <button 
                          type="button" 
                          className="btn btn-light"
                          onClick={() => {
                            // Show waiting room of newly created room
                            this.setState({ showWaitingModal: true });
                          }}
                          >Create</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="panel panel-default">
                <div className="panel-heading"><h1>Room List</h1></div>
                <div className="panel-body">
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>No.</th>
                          <th>Name</th>
                          <th>Number of Players</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.props.lobbyStore.rooms.map((e,i) => (
                          <tr 
                            key={i}
                            onClick={() => {
                              // Show waiting room of this room
                              this.setState({ showWaitingModal: true });
                            }}
                          >
                            <td>{i + 1}</td>
                            <td>{e.name}</td>
                            <td>{e.number}</td>
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
          }}
        />
      </div>
    );
  }
}

export default WaitingRoom;
