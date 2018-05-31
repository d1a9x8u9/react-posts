import React, { Component } from 'react'

import classes from './Post.css'
import { Link } from 'react-router-dom'
import { auth } from '../../../firebase'

class Post extends Component {
    state = {
        user: null,
        unsubscribe: null
    }

    componentWillMount = () => {
        this.setState({unsubscribe: auth.onAuthStateChanged( user => {
            if(user)
                this.setState({user})
            })
        })
        
    }

    componentWillUnmount = () => {
        this.state.unsubscribe()
    }

    setBodyLineBreak = () => {
        return this.props.body.split('\n')
    }

    render () {
        let canUserModifyPost = null
        
        if(this.state.user && (this.state.user.displayName === this.props.author))
            canUserModifyPost = (
                <div>
                   <span onClick={this.props.delete} className={classes.Delete}><i className="fas fa-times"></i> Delete</span>
                   <Link to={`edit/${this.props.id}`} className={classes.Link} >
                            <span className={classes.Edit}><i className="fas fa-edit"></i> Edit</span>
                    </Link>
                </div>
            )

        let post = null
        

        post = (
            <div>
                <div className={classes.Title}>
                    {this.props.title}
                    <small>by {this.props.author}</small> 
                </div>
                <div className={classes.Timestamp}>{this.props.timestamp}</div>
                <div className={classes.Body}>
                    {this.setBodyLineBreak().map( (line,index) => line ? <div key={index}>{line}</div> : <div key={index}>&nbsp;</div> )}
                </div>
                {canUserModifyPost ? canUserModifyPost : null}
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