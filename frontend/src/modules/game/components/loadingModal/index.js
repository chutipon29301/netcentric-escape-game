import React, { Component } from "react";
import "./style.scss";
import { inject, observer } from "mobx-react";

@inject("gameStore", "waitingRoomStore")
@observer
export default class LoadingModal extends Component {

    render() {
        return (
            <div className="modal waiting-modal" style={{ display: this.props.gameStore.shouldLoadingModalShow ? "block" : "none" }}>
                <div className="modal-background" />
                <div className="modal-dialog modal-dialog-centered modal-sm">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="row">
                                <div className="col">
                                    <span><img src="https://cdn.vox-cdn.com/thumbor/mEw4A38VUDmm-mrO4FRB0iBE8ng=/0x0:1800x1016/1400x1400/filters:focal(756x364:1044x652):format(gif)/cdn.vox-cdn.com/uploads/chorus_image/image/53923785/controller_1.0.gif" style={{width:'30px',marginRight:'5px'}}></img></span>
                                    Let's start !
                                    <p>Welcome {this.props.waitingRoomStore.selfName}</p>
                                    <p>Loading...</p>
                                    <div className="loading">
                                        <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )

    }

}
