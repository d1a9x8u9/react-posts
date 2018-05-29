import React, { Component } from 'react';

import Posts from '../Posts/Posts'
import firebase from 'firebase'
import classes from './Layout.css'
import { config } from '../../config.json'

firebase.initializeApp(config)
const db = firebase.database()

class Layout extends Component {
  state = {
        showCreate: false,
        showPosts: true,
        showEdit: false,
        posts: [],
        create: {
            title: '',
            body: '',
        },
        numOfEntries: '',
    }

componentDidMount = () => {
    let posts = [...this.state.posts]

    db.ref(`posts/`).once('value')
    .then( snapshot => {
        for( const[key,value] of Object.entries(snapshot.val())) {
            let post = {}
            for( const [k,v] of Object.entries(value)) post[k] = v
            post.id = key
            posts.push(post)
        }
        this.setState({
            posts: posts,
            numOfEntries: posts.length
        })
    })
    .catch(err => console.log(err))
}

showPostsHandler = () => {
    const showPosts = this.state.showPosts
    this.setState({showPosts: !showPosts})
}

onDeletePostHandler = (pId) => {
    db.ref(`/posts/${pId}`).remove()
        .then( res => {
            let posts = [...this.state.posts]
            const postIndex = posts.findIndex( post => post.id === pId)
            posts.splice(postIndex, 1)
            this.setState({
                posts: posts,
                numOfEntries: posts.length
            })
        })
        .catch( err => console.log(err))
}

createPostsHandler = () => {
    const showCreate = this.state.showCreate
    this.setState({showCreate: !showCreate})
}

submitHandler = (event) => {
    const newPostKey = db.ref().child('posts').push().key

    db.ref('/posts/' + newPostKey).set(this.state.create)
        .then( () => {
            let post = {...this.state.create}
            post.id = newPostKey
            let posts = this.state.posts
            posts.push(post)
            this.setState({
                posts: posts,
                numOfEntries: posts.length
            })
        })
        .catch( err => console.log(err))

    this.setState({
        showCreate: false,
        showPosts: true
    })
    event.preventDefault()
}

onChangeInputHandler = (event) => {
    let post = {...this.state.create}
    post.title = event.target.value
    this.setState({create: post})
}

onChangeTextAreaHandler = (event) => {
    let post = {...this.state.create}
    post.body = event.target.value
    this.setState({create: post})
}

render() {
    // Show all posts?
    let posts = null

    if(this.state.showPosts && this.state.posts) {
        posts = <Posts 
                posts={this.state.posts}
                clicked={this.onDeletePostHandler}
            />
    }
    
    // Show Create Posts?
    let createPosts = null

    if(this.state.showCreate) {
        createPosts = (
            <form onSubmit={this.submitHandler}>
                <label>Title:</label>
                <input type="text" onChange={this.onChangeInputHandler} />
                <label>Body:</label>
                <textarea type="text" onChange={this.onChangeTextAreaHandler} />
                <button type="submit" value="Submit">Submit</button>
            </form>
        )
    }

    let controls = (
        <div>
            <button onClick={this.showPostsHandler}>All posts</button>
            <button onClick={this.createPostsHandler}>Create a Post</button>
        </div>
    )

    return (
        <div className={classes.Layout}>
            {controls}
            {createPosts}
            {posts}
        </div>
    )
}
}

export default Layout;
