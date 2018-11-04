import React, { Component } from "react";
import "./style.scss";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import WaitingModal from "./components/WaitingModal";
import { BASE_URL } from "../../env";
import Axios from "../../axiosConfig";

@inject("routing", "roomStore", "login")
@withRouter
@observer
class WaitingRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showWaitingModal: false,
      tableData: [{ name: "-", playerCount: "-", token: "" }],
      createdRoomName: "",
      clickedRoomToken: "",
      playerToken: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleCreateRoom = this.handleCreateRoom.bind(this);
    this.emitOnlineUserSocket = this.emitOnlineUserSocket.bind(this);
    this.setClickedRoomToken = this.setClickedRoomToken.bind(this);
  }

  emitOnlineUserSocket() {
    // console.log("this is token >>>>>>", this.state.playerToken);
    let socket = new WebSocket(
      `${BASE_URL}/onlinePlayer?token=${localStorage.getItem("playerToken")}`
    );
    // this.onlineUserSocketCollection.push(socket);
    socket.addEventListener("message", ({ data }) => {
      // console.log(JSON.parse(data));
      this.setState({ tableData: JSON.parse(data) });
      // console.log(localStorage.getItem("plyerToken"));
    });
    socket.addEventListener("error", event => {
      if (event.code === 1006) {
        this.emitOnlineUserSocket();
      }
    });
  }

  componentDidMount() {
    // console.log(">>>>>>>>>>>>>>>>>",localStorage.getItem("playerToken"));
    this.setState({ playerToken: localStorage.getItem("playerToken") });
    // console.log(this.state.playerToken);
    this.emitOnlineUserSocket();
  }

  setClickedRoomToken(token) {
    this.setState({ clickedRoomToken: token });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleCreateRoom(event) {
    // event.preventDefault();
    // console.log(localStorage.getItem("playerToken"))
    Axios({
      method: "post",
      url: "/createRoom",
      data: {
        name: this.state.createdRoomName,
        owner: localStorage.getItem("playerToken")
      }
    })
      .then(res => {
        console.log("res token:", res.data.info.token);
        this.props.roomStore.joinRoom(
          localStorage.getItem("playerToken"),
          res.data.info.token
        );
        this.props.roomStore.setRoomToken(res.data.info.token);
      })
      .catch(error => {
        console.log("error:",error.response);
      });
  }

  handleJoinRoom() {
    let ownerToken = this.state.playerToken;
    let roomToken = this.state.clickedRoomToken;
    console.log("ownerToken", ownerToken);
    console.log("roomToken", roomToken);
    this.props.roomStore.joinRoom(ownerToken, roomToken);
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
                          disabled={this.state.createdRoomName == ""}
                          onClick={() => {
                            // Show waiting room of newly created room
                            this.setState({ showWaitingModal: true });
                            this.handleCreateRoom();
                            this.setState({ createdRoomName: "" });
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
                        {/* {console.log("table dataaaaaa", this.state.tableData)} */}
                        {this.state.tableData.map((e, i) => (
                          <tr
                            key={i}
                            onClick={() => {
                              this.setClickedRoomToken(e.token);
                              this.handleJoinRoom();
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
