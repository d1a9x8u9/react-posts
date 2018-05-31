import React, { Component } from 'react';

import Posts from '../../components/Posts/Posts'
import classes from './Blog.css'
import firebase, { auth } from '../../firebase'

const db = firebase.database()

class Blog extends Component {
    state = {
        showCreate: false,
        posts: [],
        create: {
            title: '',
            body: '',
            author: '',
        },
        user: null
    }

    componentDidMount = () => {
        auth.onAuthStateChanged( user => {
            this.setState({
                user
            })
        })

        let posts = [...this.state.posts]
        db.ref(`posts/`).once('value')
            .then(snapshot => { 
                const dbPosts = snapshot.val()
                if (!dbPosts)
                    return
                for (const [key, value] of Object.entries(dbPosts)) {
                    let post = {}                   
                    for (const [k, v] of Object.entries(value)) post[k] = v                    
                    post.id = key
                    posts.push(post)
                }
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
        if (!this.state.create.title.trim() || !this.state.create.body.trim()) 
            return

        const today = new Date();
        const date = `${today.getMonth()}-${today.getDate()}-${today.getFullYear()}`
        console.log(date)
        const newPostKey = db.ref().child('posts').push().key
        db.ref('/posts/' + newPostKey).set({
            ...this.state.create,
            author: this.state.user.displayName,
            timestamp: date
        })
            .then(() => {
                let post = {
                    ...this.state.create,
                    id: newPostKey,
                    author: this.state.user.displayName,
                    timestamp: date
                }
                let posts = this.state.posts
                posts.push(post)
                this.setState({
                    posts: posts,
                    showCreate: false,
                    create: {
                        title: '',
                        body: '',
                        author: ''
                    }
                })
            })
            .catch(err => console.log(err))
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

    render() {
        // Show all posts
        let posts = null

        if (this.state.posts.length) {
            posts = 
                <Posts 
                    posts={this.state.posts}
                    clicked={this.onDeletePostHandler}
                />
        }

        // Show Create Posts?
        let createPosts = null

        if (this.state.showCreate) {
            createPosts = (
                <form onSubmit={this.submitHandler}>
                    <label>Title:</label> 
                    <input type="text" name="title" onChange={this.onChangeHandler} /> 
                    <label>Body:</label> 
                    <textarea type="text" name="body" onChange={this.onChangeHandler}/> 
                    <button type="submit" value="Submit">Submit</button> 
                </form>
            )
        }

        let blog = null

        if(this.state.user)
            blog = ( 
                <div>
                    <div className={classes.Blog}>
                        <button name="showCreate" onClick={this.createPostsHandler}>Create a Post</button> 
                        {createPosts}
                        {posts} 
                    </div>
                </div>
            )
        else 
            blog = (
                <div className={classes.Blog}>
                    <p>You must be logged in to submit a post.</p>
                    {posts}
                </div>
            )
            
        return ( 
            <div>
                {blog}
            </div>
            )
        }
}
                            
export default Blog;