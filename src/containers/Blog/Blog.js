import React, { Component } from 'react';

import Posts from '../../components/Posts/Posts'
import classes from './Blog.css'
import firebase, { auth } from '../../firebase'

const db = firebase.database()

class Blog extends Component {
    state = {
        showCreate: false,
        posts: [],
        create: {},
        user: null,
        errorMessage: null
    }
    
    componentDidMount = () => {
        auth.onIdTokenChanged( user => {
            this.setState({user: user})
        })

        let posts = [...this.state.posts]
        db.ref(`posts/`).once('value')
            .then(snapshot => { 
                const dbPosts = snapshot.val()
                if (!dbPosts)
                    return
                for (const [key, value] of Object.entries(dbPosts)) {
                    let post = { id: key }                   
                    for (const [k, v] of Object.entries(value)) post[k] = v                    
                    posts.push(post)
                }
                posts.reverse()         
                this.setState({
                    posts: posts,
                })
            })
            .catch(err => console.log(err))
    }

    onDeletePostHandler = (pId) => {
        db.ref(`/posts/${pId}`).remove()
            .then(res => {
                let posts = [...this.state.posts]
                const postIndex = posts.findIndex(post => post.id === pId)
                posts.splice(postIndex, 1)
                this.setState({
                    posts: posts,
                })
            })
            .catch(err => console.log(err))
    }

    createPostsHandler = () => {
        const showCreate = this.state.showCreate
        this.setState({
            showCreate: !showCreate
        })
    }

    submitHandler = (event) => {
        if (!this.state.create.title.trim() || !this.state.create.body.trim()) {
            this.setState({errorMessage: "Please fill out all required fields."})
        }
        else {
            const today = new Date();
            const date = `${today.getMonth() + 1}-${today.getDate()}-${today.getFullYear()}`

            const newPostKey = db.ref().child('posts').push().key
            db.ref('/posts/' + newPostKey).set({
                ...this.state.create,
                author: this.state.user.displayName,
                timestamp: date,
                uid: this.state.user.uid
            })
                .then(() => {
                    let post = {
                        ...this.state.create,
                        id: newPostKey,
                        author: this.state.user.displayName,
                        timestamp: date,
                        uid: this.state.user.uid
                    }
                    let posts = this.state.posts
                    posts.unshift(post)
                    this.setState({
                        posts: posts,
                        showCreate: false,
                        create: {},
                        errorMessage: null
                    })
                })
                .catch(err => console.log(err))
        }
        event.preventDefault()
    }

    onChangeHandler = (event) => {
        this.setState({
            create: {
                ...this.state.create,
                [event.target.name]: event.target.value
            }
        })
    }

    updatedPost = (editedPost) => {
         let posts = this.state.posts.map( post => {
            if(post.id === editedPost.id) {
                return editedPost
            }
            return post
        })
        this.setState({posts: posts})
    }

    render() {
        let posts = null

        if (this.state.posts.length) {
            posts = <Posts 
                        posts={this.state.posts}
                        deleted={this.onDeletePostHandler}
                        updatedPost = {this.updatedPost}
                    />
        }

        let createPosts = null

        if (this.state.showCreate) {
            createPosts = (
                <form className={classes.CreateForm} onSubmit={this.submitHandler}>
                    <div>{this.state.errorMessage}</div>
                    <label>Title:</label> 
                    <input type="text" name="title" onChange={this.onChangeHandler} /> 
                    <label>Body:</label> 
                    <textarea type="text" name="body" onChange={this.onChangeHandler}/> 
                    <button type="submit" value="Submit">Submit</button> 
                </form>
            )
        }


        let createPostControl = this.state.user ? (
            <div className={classes.CreatePostControl}>
                <div onClick={this.createPostsHandler} style={{cursor: 'pointer'}}><i className="fas fa-plus fa-1x"></i> Create a Post</div> 
                {createPosts}
            </div>
        ) : "Log in to contribute"


        let blogView = null

        blogView = (
            <div className={classes.Blog}>
                {createPostControl}
                {posts}
            </div>
        )
            
        return ( 
            <div>
                {blogView}
            </div>
            )
        }
}
                            
export default Blog;