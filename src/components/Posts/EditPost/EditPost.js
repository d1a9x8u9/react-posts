import React, { Component } from 'react'

import { Redirect } from 'react-router-dom'
import classes from './EditPost.css'
import firebase from '../../../firebase'

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
            .then(snapshot => {
                this.setState({ post: snapshot.val() })
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
        if(!this.state.post.title.trim() || !this.state.post.body.trim()) 
            return
        db.ref(`posts/${this.props.match.params.id}`).update(this.state.post)
        this.setState({ done: true })
    }

    render() {
        let editPost = `Loading ${this.props.match.params.id} data...`

        if (this.props.match.params.id && this.state.post) {
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

        if (this.state.done) {
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