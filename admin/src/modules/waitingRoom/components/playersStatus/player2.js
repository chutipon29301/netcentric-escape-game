import React from 'react'

class Player2 extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        
    }

    handleSubmit(event) {
        event.preventDefault();
        
    }

    render() {
        return (
            <div>
                <div className="card">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item active" aria-current="page">User 2</li>
                        </ol>
                    </nav>
                    <div className="card-body">
                    </div>
                </div>
            </div>
        );
    }
}

export default Player2;