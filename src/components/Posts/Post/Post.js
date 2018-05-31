import React, { Component } from 'react'

import classes from './Post.css'
import fontawesome from '@fortawesome/fontawesome'
import facancel from '@fortawesome/fontawesome-free-solid/faTimes' 
import faedit from '@fortawesome/fontawesome-free-solid/faEdit'
import { Link } from 'react-router-dom'
import { auth } from '../../../firebase'

fontawesome.library.add(facancel)
fontawesome.library.add(faedit)

class Post extends Component {
    state = {
        user: null
    }

    componentWillMount = () => {
        auth.onAuthStateChanged( user => {
            if(user)
                this.setState({user})
        })
    }

    render () {
        let post = null

        if(this.state.user) 
            post = (
                <div>
                    <div className={classes.Title}>
                        {this.props.title}
                        <small>by {this.props.author}</small> 
                    </div>
                    <div className={classes.Timestamp}>{this.props.timestamp}</div>
                    <div className={classes.Body}>{this.props.body}</div>
                    <span onClick={this.props.click} className={classes.Delete}><i className="fas fa-times"></i> Delete</span>
                    <Link to={`edit/${this.props.id}`} >
                        <span className={classes.Edit}><i className="fas fa-edit"></i> Edit</span>
                    </Link>
                </div>
            )
        
        else 
            post = (
                <div>
                    <div className={classes.Title}>
                        {this.props.title}
                        <small>by {this.props.author}</small> 
                    </div>
                    <div className={classes.Timestamp}>{this.props.timestamp}</div>
                    <div className={classes.Body}>{this.props.body}</div>
                </div>
            )

        return (
            <div className={classes.Post}>
                {post}
            </div>
        )
    }   
}

export default Post