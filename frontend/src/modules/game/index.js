import React, { Component } from "react";
import "./style.scss";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import NavBar from "./components/navBar";
import Field from "./components/field";
import Keypad from "./components/keyPad";
import LoadingModal from "./components/loadingModal";
import ResultModal from "./components/resultModal";
import { autorun } from "mobx";

@inject("routing", "gameStore","gameService","loginService")
@withRouter
@observer
export default class Game extends Component {

    componentDidMount() {
        this.props.gameStore.init();
    }

    componentWillUnmount() {
        this.props.gameStore.dispose();
        
    }
    
    render() {
        return (
            <div>
                <NavBar />
                <div className="game">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 col-md-7 game-panel">
                                <div className="field">
                                    <Field />
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-5 control-panel">
                                <Keypad />
                            </div>
                        </div>
                    </div>
                </div>
                <LoadingModal />
                <ResultModal />
            </div>
        );
    }
    
}
