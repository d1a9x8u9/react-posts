import React, { Component } from 'react'

import firebase from 'firebase'
import { Redirect } from 'react-router-dom'
import classes from './EditPost.css'

const db = firebase.database()

class EditPost extends Component {
    state = {
        post: '',
        done: false
    }

    componentWillMount = () => {
        this.getPostDataHandler()
    }

    getPostDataHandler = () => {
        db.ref(`posts/${this.props.match.params.id}`).once('value')
            .then( snapshot => {
            this.setState({post: snapshot.val()})
        })
    }

    onTitleChangeHandler = (event) => {
        this.setState({
            post: {
                ...this.state.post,
                title: event.target.value
            }
        })
    }

    onTextAreaChangeHandler = (event) => {
        this.setState({
            post: {
                ...this.state.post,
                body: event.target.value
            }
        })    
    }

    onSubmitClickHandler = () => {
        db.ref(`posts/${this.props.match.params.id}`).update(this.state.post)
        this.setState({done: true})
    }
    
    render () {
        let editPost = `Loading ${this.props.match.params.id} data...`

        if(this.props.match.params.id && this.state.post) {
            editPost = (
                <form onSubmit={this.onSubmitClickHandler}>
                    <label>Title:</label>
                    <input type="text" onChange={this.onTitleChangeHandler} value={this.state.post.title} />
                    <label>Body:</label>
                    <textarea type="text" onChange={this.onTextAreaChangeHandler} value={this.state.post.body} />
                    <button type="submit" value="Submit">Submit</button>
                </form>
            )
        }

        if(this.state.done) {
            return <Redirect to='/' />
        }

        return (
            <div className={classes.EditPost}>
                {editPost}
            </div>
        )
    }
}

export default EditPost