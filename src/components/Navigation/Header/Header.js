import React, { Component } from 'react'

import classes from './Header.css'
import User from '../../User/User'



class Header extends Component {
    render() {
        return (
            <div>
                <div className={classes.Header}>
                    <a href="https://github.com/d1a9x8u9/react-posts"><i className="fab fa-github fa-2x"></i></a>
                    <div className={classes.User}>
                        <User />
                    </div>
                </div>
                <div className={classes.Title}><a href="/">Bloggist</a><small>A simple React.js blog</small></div>
            </div>
        )
    }
}

export default Header