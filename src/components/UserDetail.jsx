import React, { Component } from 'react'

class UserDetail extends Component {
    render() {
        return (
            <div>
                  <h1>Welcome to your page</h1>
                  <img src={this.props.user.avatar}/>
                  <h2>{this.props.user.pseudo}</h2>
                  <h3>{this.props.user.region}</h3>
                  <p>{this.props.user.email}</p>
            </div>
        )
    }
}

export default UserDetail;