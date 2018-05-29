import React, { Component } from 'react';

import classes from './App.css';
import Posts from '../components/Posts/Posts'
import axios from '../axios-post'

class App extends Component {
  state = {
        showCreate: false,
        showPosts: true,
        showEdit: false,
        posts: [],
        create: {
            title: '',
            body: '',
        }
    }

componentDidMount = () => {
    let posts = [...this.state.posts]
    axios.get('/posts.json')
    .then( res => {
        for ( const [key,value] of Object.entries(res.data)) {
            let post = {id: key}
            for( const [k,v] of Object.entries(value)) post[k] = v
            posts.push(post)
        }
        this.setState({posts: posts})
    })
    .catch(err => console.log(err))
}

showPostsHandler = () => {
    const showPosts = this.state.showPosts
    this.setState({showPosts: !showPosts})
}

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
    
    axios.post('/posts.json', this.state.create)
        .then( res => console.log(res) )
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
                changed={this.onChangeHandler}
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
        <div className={classes.App}>
            {controls}
            {createPosts}
            {posts}
        </div>
    )
}
}

export default App;
