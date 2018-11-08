import React from 'react'
import Axios from '../../axiosConfig'
import { observer, inject } from "mobx-react";
import { SOKCET_URL} from '../../../env';
import gameStore from '../stores/store';
@observer
class GameList extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        gameStore.init();
    }

    resetGame(roomToken) {
        console.log(roomToken)
        Axios({
            method: 'post',
            url: `/resetGame/`,
            data: {token: roomToken}
        }).then((response) => { 

            console.log(response)
        });
    }



    render() {
        return (
            <div>
                <div className="d-flex flex-row">
                        <table className="table mt-5">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Game Running</th>
                                    <th scope="col">No. of player</th>
                                    <th scope="col">Whose Turn?</th>
                                    <th scope="col">Reset Game</th>

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    gameStore.gameData.map((row,index)=>{
                                        return <tr key={index} >
                                             <td>{index + 1}</td>
                                             <td>{row.isGameRunning.toString()}</td>
                                             <td>{row.maxPlayer}</td>
                                             <td>{(row.playerIndex!==-1)?row.player[row.playerIndex].name:""}</td>
                                             <td><button name="delete" onClick={()=>this.resetGame(row.roomToken)} className="btn btn-outline-danger btn-sm remove">Reset</button></td>

                                         </tr>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
            </div>
        );
    }
}
export default GameList;


