import React, { Component } from 'react'

import classes from './Posts.css'
import Post from './Post/Post'

class Posts extends Component {
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
                    {this.state.posts.map( (post, index) => {
                        return <Post 
                        title={post.title} 
                        body={post.body} 
                        click={() => this.onDeletePostHandler(index)} 
                        change={(event) => this.onChangeHandler(event, post.id)}
                        key={index}/>
                    })}
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

export default Posts