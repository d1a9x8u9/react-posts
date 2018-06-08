import React, { Component } from 'react'

import classes from './Post.css'
import firebase, { auth } from '../../../firebase'

const db = firebase.database()

class Post extends Component {
    state = {
        user: null,
        unsubscribe: null,
        editMode: false,
        post: {
            title: this.props.title,
            body: this.props.body,
            author: this.props.author,
            timestamp: this.props.timestamp,
            id: this.props.id,
            uid: this.props.uid
        },
        errorMessage: null,
    }

    componentWillMount = () => {
        this.setState({unsubscribe: auth.onIdTokenChanged( user => {
            this.setState({user: user})
            })
        })
    }

    componentWillUnmount = () => {
        this.state.unsubscribe()
    }

    setBodyLineBreak = () => {
        return this.state.post.body.split('\n')
    }

    onChangeHandler = (event) => {
        this.setState({
            post: {
                ...this.state.post,
                [event.target.name]: event.target.value
            }
        })
    }

    onEditClickHandler = () => {
        this.setState({editMode: true})
    }

    onSubmitCancelHandler = () => {
        this.setState({editMode: false})
    }

    onSubmitClickHandler = () => {
        const formIsFilled = !this.state.post.title.trim() || !this.state.post.body.trim() 
        const userIsAuthor = this.state.user.uid === this.state.post.uid
        if(formIsFilled || !userIsAuthor) {
            let errorMessage = !userIsAuthor ? "Invalid Credentials." : "Please fill out all required fields."
            this.setState({errorMessage: errorMessage})
            return
        }
        db.ref(`posts/${this.state.post.id}`).update(this.state.post)
        this.props.updatePost({...this.state.post})
        this.setState({ 
            editMode: false,
            errorMessage: null,
        })
    }

    render () {
        let showMessage = null 
        if(this.state.errorMessage) 
            showMessage = (
                <span className={classes.ErrorMessage}>{this.state.errorMessage}</span>
            )

        let editPostView = null 

        if(this.state.editMode) 
            editPostView = (
                <div>
                    {showMessage}
                    <div className={classes.Title}>
                        <input className={classes.EditTitle} name="title" value={this.state.post.title} onChange={this.onChangeHandler} />
                        <small>by {this.state.post.author}</small> 
                    </div>
                    <div className={classes.Timestamp}>{this.state.post.timestamp}</div>
                    <div className={classes.Body}>
                        <textarea className={classes.EditBody} name="body" value={this.state.post.body} onChange={this.onChangeHandler}/>
                    </div>
                    <div>
                        <span onClick={this.onSubmitClickHandler} className={classes.Edit}><i className="fas fa-edit"></i> Submit</span>
                        <span onClick={this.onSubmitCancelHandler} className={classes.Delete}><i className="fas fa-times"></i> Cancel</span>
                    </div>

                </div>
            )

        let canUserModifyPost = null
        
        if(this.state.user && (this.state.user.uid === this.props.uid))
            canUserModifyPost = (
                <div>
                    <span onClick={this.onEditClickHandler}className={classes.Edit}><i className="fas fa-edit"></i> Edit</span>
                    <span onClick={this.props.delete} className={classes.Delete}><i className="fas fa-times"></i> Delete</span>
                </div>
            )

        let post = null
        
        post = (
            <div>
                <div className={classes.Title}>
                    {this.state.post.title}
                    <small>by {this.state.post.author}</small> 
                </div>
                <div className={classes.Timestamp}>{this.state.post.timestamp}</div>
                <div className={classes.Body}>
                    {this.setBodyLineBreak().map( (line, index) => line ? <div key={index}>{line}</div> : <div key={index}>&nbsp;</div> )}
                </div>
                {canUserModifyPost ? canUserModifyPost : null}
            </div>
        )

        return (
            <div className={classes.Post}>
                {editPostView ? editPostView : post}
            </div>
        )
    }   
}

export default Post