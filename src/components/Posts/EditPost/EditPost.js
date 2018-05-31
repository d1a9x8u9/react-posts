import React, { Component } from 'react'

import { Redirect } from 'react-router-dom'
import classes from './EditPost.css'
import firebase, { auth } from '../../../firebase'

const db = firebase.database()

class EditPost extends Component {
    state = {
        post: '',
        done: false,
        user: null,
    }

    componentWillMount = () => {
        auth.onAuthStateChanged( user => {
            db.ref(`posts/${this.props.match.params.id}`).once('value')
            .then(snapshot => {
                const post = snapshot.val()
                let done = null
                if(user) 
                    done = user.displayName !== post.author ? true : false      // Validate user
                this.setState({
                    post: post,
                    done: done,
                    user: user
                })
            })
        })
    }
    
    onChangeHandler = (event) => {
        this.setState({
            post: {
                ...this.state.post,
                [event.target.name]: event.target.value
            }
        })
    }

    onSubmitClickHandler = () => {
        const formIsFilled = !this.state.post.title.trim() || !this.state.post.body.trim() 
        const userIsAuthor = this.state.user.displayName === this.state.post.author
        if(formIsFilled || !userIsAuthor) 
            return
        db.ref(`posts/${this.props.match.params.id}`).update(this.state.post)
        this.setState({ done: true })
    }

    render() {
        if (this.state.done) {
            return <Redirect to='/' />
        }

        const postId = this.props.match.params.id
        let editPost = `Loading ${postId} data...`

        if (postId && this.state.post) {
            editPost = (
                <form onSubmit={this.onSubmitClickHandler}>
                    <label>Title:</label>
                    <input type="text" name="title" onChange={this.onChangeHandler} value={this.state.post.title} />
                    <label>Body:</label>
                    <textarea type="text" name="body" onChange={this.onChangeHandler} value={this.state.post.body} />
                    <button type="submit" value="Submit">Submit</button>
                </form>
            )
        }
        
        return (
            <div className={classes.EditPost}>
                {editPost}
            </div>
        )
    }
}

export default EditPost