import React, { Component } from 'react'

import classes from './Layout.css'
import Header from '../../components/Navigation/Header/Header'

class Layout extends Component {
    render () {
        return(
            <div>
                <Header />
                <main classes={classes.Layout}>
                    {this.props.children}
                </main>
            </div>
        )
    }
}

export default Layout