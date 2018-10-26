import React from 'react'
import WaitingUser from './components/waitingUser';
import LoginUser from './components/loginUser'
export default class WaitingRoom extends React.Component {
    render() {
        return (
            <div>
            <div className="d-flex flex-row">
                <div className="col-4 ">
                    <h2 className="mt-1">Waiting Room</h2>
                    <LoginUser />
                </div>
                <div className="col-8">
                    <WaitingUser />
                </div>

            </div>
            
            </div>

        )
    }
}
