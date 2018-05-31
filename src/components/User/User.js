import React, { Component } from 'react'

import classes from './User.css'
import { auth, provider } from '../../firebase'

class User extends Component {
    state = {
        user: null,
    }

    componentWillMount = () => {
        auth.onAuthStateChanged( user => {
            if(user) {
                this.setState({
                    user: user
                })
            }
        })
    }

    logout = () => {
        auth.signOut() 
        .then ( () => {
            this.setState({
                user: null,
            })
        })
    }

    login = () => {
        auth.signInWithPopup(provider)
            .then( res => {
                const user = res.user;
                this.setState({
                    user
                })
            })
    }

    render () {
        let displayUserProfile = null

        if(this.state.user) {
            displayUserProfile = (
                <div className={classes.userProfileCard}>
                    <div>{this.state.user.email}</div>
                    <button onClick={this.logout}>Log out</button>
                </div>
            )
        }

        else {
            displayUserProfile = (
                <div>
                    <button onClick={this.login}>Log in</button>
                </div>
            )
        }

        return (
            <div className={classes.userWrapper}>
                {displayUserProfile}
            </div>
        )
    }
}

export default User