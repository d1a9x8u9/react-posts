import React from 'react'

import classes from './Post.css'
import fontawesome from '@fortawesome/fontawesome'
import facancel from '@fortawesome/fontawesome-free-solid/faTimes' 

fontawesome.library.add(facancel)

const post = (props) => {
    return (
        <div className={classes.Post} >
            <h2>{props.title}</h2> 
            <p>{props.body}</p>
            <span onClick={props.click} className={classes.Delete}><i className="fas fa-times"></i> Delete</span>
        </div>
    )
}

export default post