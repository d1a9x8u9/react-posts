import React from 'react'

import Time from './WsToolbarItems/Time/Time'
import classes from './WsToolbar.css'

const wsToolbar = (props) => (
    <div className={classes.WsToolbar}>
        <Time />
    </div>
)

export default wsToolbar