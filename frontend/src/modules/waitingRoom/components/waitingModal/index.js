import React, {Component} from "react";
import "./style.scss";
import { inject, observer } from "mobx-react";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "mdbreact";

@inject("waitingRoomStore")
@observer
export default class WaitingModal extends Component {

    render(){  
        return (
            <div className="modal waiting-modal" style={{ display: this.props.waitingRoomStore.shouldWaitingModalShow ? "block" : "none" }}>
                <div className="modal-background" />
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{this.props.waitingRoomStore.roomDetail.name}</h5>
                                    <button type="button"
                                            className="close"
                                            aria-label="Close"
                                            onClick={() => this.props.waitingRoomStore.dismissWaitingModal()}
                                    >
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                            </div>
                            <div className="modal-body">
                            <div className="row">
                                <div className="col">
                                    <table className="table">
                                        <tbody>
                                            <tr>
                                                <td className="align-middle w-50"></td>
                                                <td className="align-middle w-50">{this.props.waitingRoomStore.selfName}</td>
                                                <td className="w-50">
                                                <button className="btn btn-primary">Ready</button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col table-wrapper-scroll-y">
                                    <table className="table">
                                        <tbody>
                                            {
                                                this.props.waitingRoomStore.player.map((player) => (
                                                    <tr key={player.token}>
                                                        <td className="w-50">{ player.name }</td>
                                                        <td className="w-50">{ player.isReady }</td>
                                                    </tr>
                                                ))
                                            }
                                            {/* {this.props.roomStore.room.player
                                                .filter(e => e.token !== localStorage.getItem("playerToken"))
                                                .map((e, i) => (
                                                <tr key={i + 1}>
                                                    <td className="w-50">{e.name}</td>
                                                    <td className="w-50">
                                                    {e.isReady ? "Ready!" : "Waiting..."}
                                                    </td>
                                                </tr>
                                                ))} */}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <Dropdown>
                                <DropdownToggle nav caret style={{ marginRight: "10px" }}>
                                dimension
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem value="5" key="5">5 x 5</DropdownItem>
                                    <DropdownItem value="6" key="6">6 x 6</DropdownItem>
                                    <DropdownItem value="7" key="7">7 x 7</DropdownItem>
                                    <DropdownItem value="8" key="8">8 x 8</DropdownItem>
                                    <DropdownItem value="9" key="9">9 x 9</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        <button style={{ marginTop: 30, width: "100%" }} className="btn btn-primary">
                            Start Game
                        </button>
                    </div>
                </div>
            </div>
        </div>
        )

    }

}
