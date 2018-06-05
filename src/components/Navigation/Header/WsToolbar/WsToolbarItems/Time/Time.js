import React, { Component } from 'react'
import io from 'socket.io-client'

const socket = io('http://localhost:8000')

class Time extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            time: 'notimeyet',
        }

        socket.on('client-recieved-time', time => this.setState({time: time}))
    }

    componentWillMount = () => {
        console.log('mounted time.js')
        socket.emit('request-time', null);    
    }

    componentWillUnmount = () => {
        socket.emit('disconnect', null)
    }

    render() {
        return(
            <div>
                <div>{this.state.time}</div>
            </div>
        )
    }
}

export default Time