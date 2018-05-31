import React, { Component } from 'react'

import classes from './Header.css'
import User from '../../User/User'



class Header extends Component {
    render() {
        return (
            <div>
                <div className={classes.Header}>
                    <a href="https://github.com/d1a9x8u9/react-posts"><i class="fab fa-github fa-2x"></i></a>
                    <div className={classes.User}>
                        <User />
                    </div>
                </div>
                <div className={classes.Title}><a href="/">Bloggist</a></div>
            </div>
        )
    }
}

export default Header