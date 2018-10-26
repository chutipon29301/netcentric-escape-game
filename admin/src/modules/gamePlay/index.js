

import React from 'react'

import Player from './components/player'
export default class GamePlay extends React.Component {
    render() {
        return (
            <div>
                <div className="d-flex flex-row ">
                    <div className="col-6 mt-3">
                        <Player />
                    </div>
                    <div className="col-6 mt-3">
                        <Player />
                    </div>
                </div>

            </div>

        )
    }
}
