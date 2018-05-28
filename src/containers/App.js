import React, { Component } from 'react';

import './App.css';
import Layout from '../components/Layout/Layout'
import Post from '../components/Posts/Post/Post'
import Posts from '../components/Posts/Posts'

class App extends Component {
  state = {
    showCreate: false,
    showPosts: false,
    showEdit: false,
    posts: [
        {title: 'p-1', body: 'Nigga Im faded', id: 1},
        {title: 'p-2', body: 'Nigga nigga Im faded', id: 2 },
        {title: 'p-3', body: 'Nigga nigga Im faded', id: 3 }
    ],
}

showPostsHandler = () => {
    const showPosts = this.state.showPosts
    this.setState({showPosts: !showPosts})

}

onChangeHandler = (event, id) => {
    const postIndex = this.state.posts.findIndex( post => {
        return post.id === id
    })

    const post = {
        ...this.state.posts[postIndex]
    }

    post.title = event.target.value

    const posts = [...this.state.posts]
    posts[postIndex] = post

    this.setState( {posts: posts} )
}

onDeletePostHandler = (pIndex) => {
    const posts = [...this.state.posts]
    posts.splice(pIndex, 1)
    this.setState({posts: posts})
}

render() {

    let create = null

    if(this.state.showPosts) {
        create = (
            <div>
                <Posts 
                posts={this.state.posts}
                clicked={this.onDeletePostHandler}
                changed={this.onChangeHandler} />
            </div>
        )
    }
    
    return (
        <div>
            <button onClick={this.showPostsHandler}>All posts</button>
            <button>create</button>
            <button>Edit</button>
            {create}
        </div>
    )
}
}

export default App;
