import React, { Component } from 'react'

import io from 'socket.io-client'
import classes from './Time.css'

const socket = io()

class Time extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            time: 'notimeyet',
        }

        socket.on('client-recieved-time', time => this.setState({time: time}))
    }

    componentWillMount = () => {
        socket.emit('request-time', null);    
    }

    componentWillUnmount = () => {
        socket.emit('disconnect', null)
    }

    render() {
        return(
            <div className={classes.Time}>
                <div>{this.state.time}</div>
            </div>
        )
    }
}

export default Time