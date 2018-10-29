import React from 'react'
// import UserStorage from './storage';
// import Axios from '../axiosConfig'
import CurrentUser from './currentUser';
import RegistUser from './registUser'
export default class EditUser extends React.Component {
    render() {
        return (
            <div className="d-flex flex-row">
                <div className="col-4 ">
                    <h2 className="mt-1">Manage User</h2>
                    <RegistUser />
                </div>
                <div className="col-8">
                    <CurrentUser />
                </div>
            </div>
        )
    }
}
