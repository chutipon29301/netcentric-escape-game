import React, { Component } from "react";
import "./style.scss";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import WaitingModal from "./components/WaitingModal";
import { BASE_URL } from "../../env";
import Axios from "../../axiosConfig";

@inject("routing","roomStore","login")
@withRouter
@observer
class WaitingRoom extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showWaitingModal: false,
      tableData: [{ name: "-", playerCount: "-", token:"" }],
      createdRoomName: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleCreateRoom = this.handleCreateRoom.bind(this);
  }

  componentDidMount() {
    let socket = new WebSocket(`${BASE_URL}/roomListener`);
    // console.log("hellooooo",this.props.login.token)
    socket.addEventListener("message", event => {
      try {
        this.setState({ tableData: JSON.parse(event.data) });
        console.log(this.state.tableData);
      } catch (error) {}
    });
    socket.addEventListener("error", function(error) {
      alert(error.toString());
      console.log(error);
    });
    socket.addEventListener("close", function() {
      console.log("Closed");
    });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleCreateRoom(event) {
    // event.preventDefault();
    Axios({
      method: "post",
      url: "/createRoom",
      data: {
        name: this.state.createdRoomName,
        owner: this.props.login.token
      }
    })
      .then(res => {
        this.props.roomStore.name=(res.name);
      })
      .catch(error => {
        console.log(error.response);
      })
  }

  render() {
    return (
      <div className="waiting-room">
        <div className="container h-100">
          <div className="row h-100">
            <div className="col-lg-6">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h1>Create Room</h1>
                </div>
                <div className="panel-body">
                  <div className="md-form">
                    <div className="row mb-lg-3">
                      <div className="col col-lg-6 col-centered">
                        <input
                          type="text"
                          id="room-name"
                          className="form-control"
                          placeholder="Room name"
                          name="createdRoomName"
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col col-lg-12 col-centered mt-3 mt-lg-1 mb-5">
                        <button
                          type="button"
                          className="btn btn-light"
                          disabled={this.state.createdRoomName==""}
                          onClick={() => {
                            // Show waiting room of newly created room
                            this.setState({ showWaitingModal: true });
                            this.handleCreateRoom();
                          }}
                        >
                          Create
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h1>Room List</h1>
                </div>
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
                        {this.state.tableData.map((e, i) => (
                          <tr
                            key={i}
                            onClick={() => {
                              // Show waiting room of this room
                              this.setState({ showWaitingModal: true });
                            }}
                          >
                            <td>{i + 1}</td>
                            <td>{e.name}</td>
                            <td>{e.playerCount}</td>
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
