import React from 'react'
import WaitingUser from './components/waitingUser';
import LoginUser from './components/loginUser'
import Rooms from './components/rooms'
import UserInRoom from './components/userInRoom'
export default class WaitingRoom extends React.Component {
    render() {
        return (
            <div>
            <div className="d-flex flex-row">
                <div className="col-4">
                    <h2 className="mt-1">Room</h2>
                    <LoginUser />
                </div>
                <div className="col-8">
                    <WaitingUser />
                </div>
            </div>
            <div className="d-flex flex-row">
                <div className="col-8 ">
                    <Rooms />
                </div>
                <div className="col-4">
                    <UserInRoom />
                </div>
            </div>
            </div>

        )
    }
}
