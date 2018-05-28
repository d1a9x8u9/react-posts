import React, { Component } from 'react';

import classes from './App.css';
import Layout from '../components/Layout/Layout'
import Post from '../components/Posts/Post/Post'
import Posts from '../components/Posts/Posts'

class App extends Component {
  state = {
        showCreate: false,
        showPosts: true,
        showEdit: false,
        posts: [
            {title: 'How to React.js', body: 'Nigga Im faded', id: 1},
            {title: 'CRA vs Next.js', body: 'Nigga nigga Im faded', id: 2 },
            {title: 'Why??', body: 'Nigga nigga Im faded', id: 3 }
        ],
        create: {
            title: '',
            body: '',
        }
    }

showPostsHandler = () => {
    const showPosts = this.state.showPosts
    this.setState({showPosts: !showPosts})
}

// onChangeHandler = (event, id) => {
//     const postIndex = this.state.posts.findIndex( post => {
//         return post.id === id
//     })

//     const post = {
//         ...this.state.posts[postIndex]
//     }

//     post.title = event.target.value

//     const posts = [...this.state.posts]
//     posts[postIndex] = post

//     this.setState( {posts: posts} )
// }

onDeletePostHandler = (pIndex) => {
    const posts = [...this.state.posts]
    posts.splice(pIndex, 1)
    this.setState({posts: posts})
}

createPostsHandler = () => {
    const showCreate = this.state.showCreate
    this.setState({showCreate: !showCreate})
}

submitHandler = (event) => {
    let post = {}
    post.title = this.state.create.title
    post.body = this.state.create.body
    let posts = [...this.state.posts]

    posts.push(post)

    this.setState({
        posts: posts,
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
    console.log(post)
    this.setState({create: post})
}

render() {

    let posts = null

    if(this.state.showPosts) {
        posts = <Posts 
                posts={this.state.posts}
                clicked={this.onDeletePostHandler}
                changed={this.onChangeHandler}
            />
    }
    
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
    return (
        <div className={classes.App}>
            <button onClick={this.showPostsHandler}>All posts</button>
            <button onClick={this.createPostsHandler}>Create a Post</button>
            {createPosts}
            {posts}
        </div>
    )
}
}

export default App;
