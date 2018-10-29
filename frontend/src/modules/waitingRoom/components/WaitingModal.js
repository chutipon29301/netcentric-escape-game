import React from 'react';
import { inject, observer } from "mobx-react";

@inject("waitingRoom")

@observer
class WaitingModal extends React.Component {
    render() {
        const { active, close } = this.props;
        const store = this.props.waitingRoom;

        return (
            <div className="modal waiting-modal" style={{ display: active ? 'block' : 'none' }}>
                <div className="modal-background"/>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Start Game</h5>
                            <button type="button" className="close">
                                <span aria-hidden="true" onClick={close}>&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col">
                                    <div className="avatar-wrapper"/>
                                    <p>
                                        {/* TODO: Get player's name */}
                                        <h5 className="name">My Name</h5>
                                        <small className="text-muted">Me</small>
                                    </p>
                                    <button 
                                        className={`btn ${ store.myReady ? 'btn-primary' : 'btn-secondary' }`}
                                        onClick={() => store.setMyReady(!store.myReady)}
                                    >
                                        I'm {store.myReady || 'not'} ready
                                    </button>
                                </div>
                                <div className="col">
                                <div className="avatar-wrapper"/>
                                    <p>
                                        <h5 className="name">{store.currentFriend.name}</h5>
                                        <small className="text-muted">Friend</small>
                                    </p>
                                    <button 
                                        className={`btn disabled ${ store.friendReady ? 'btn-primary' : 'btn-secondary' }`}
                                    >
                                        {store.currentFriend.name} is {store.friendReady || 'not'} ready
                                    </button>
                                </div>
                            </div>
                            <div 
                                style={{ marginTop: 30 }}
                                className={`btn btn-primary btn-lg btn-block 
                                ${(store.friendReady && store.myReady) || 'disabled'}`}
                            >
                                Start Game
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default WaitingModal;