import React from 'react'

import classes from './Post.css'
import fontawesome from '@fortawesome/fontawesome'
import facancel from '@fortawesome/fontawesome-free-solid/faTimes' 
import { Link } from 'react-router-dom'

fontawesome.library.add(facancel)

const post = (props) => {
    return (
        <div className={classes.Post} >
            <h2>{props.title}</h2> 
            <p>{props.body}</p>
            <span onClick={props.click} className={classes.Delete}><i className="fas fa-times"></i> Delete</span>
            <Link to={`edit/${props.id}`} >
                <button> Edit </button>
            </Link>
        </div>
    )
}

export default post