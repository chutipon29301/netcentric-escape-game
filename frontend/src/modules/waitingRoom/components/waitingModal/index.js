import React, {Component} from "react";
import "./style.scss";
import { inject, observer } from "mobx-react";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "mdbreact";

@inject("waitingRoomStore")
@observer
export default class WaitingModal extends Component {
    constructor(props){
        super(props)
    }

    handleChange(event) {
        this.props.waitingRoomStore.onChange(event.target.name,event.target.value)
    }
    
    render(){  
        return (
            <div className="modal waiting-modal" style={{ display: this.props.waitingRoomStore.waitingModalShowStyle }}>
                <div className="modal-background" />
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{this.props.waitingRoomStore.roomDetail.name}</h5>
                                    <button type="button"
                                            className="close"
                                            aria-label="Close"
                                            onClick={this.props.waitingRoomStore.dismissWaitingModal}>
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
                                                    
                                                    <td>
                                                        <button 
                                                            onClick={() => this.props.waitingRoomStore.setReadyState(!this.props.waitingRoomStore.selfReady)}
                                                            className={(this.props.waitingRoomStore.selfReadyButton)}
                                                        >{this.props.waitingRoomStore.selfReadyText}
                                                        </button>
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
                                                            <td className="w-50">{ player.readyState }</td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="input-group"  style={{ display: this.props.waitingRoomStore.isOwnerStyle }} >
                                    <select className="custom-select" onChange={this.handleChange}>
                                        { this.props.waitingRoomStore.availableGameDimension.map((dimension,index) =>{
                                            return <option key={index} name="gameDimension" value={dimension}>{dimension} x {dimension}</option>
                                        })
                                        }
                                    </select>
                                    <div className="input-group-append">
                                        <button 
                                            style={{ marginTop: 30, width: "100%", display: this.props.waitingRoomStore.shouldCreateGameButtonShow ? "block" : "none" }} 
                                            className="btn btn-primary"
                                            onClick={this.props.waitingRoomStore.createGame}
                                        >
                                        Start Game
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        )
    }
}
