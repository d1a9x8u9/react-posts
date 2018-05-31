import React, { Component } from 'react'

import Post from './Post/Post'

class Posts extends Component {
    render() {
        return this.props.posts.map( post => {
            return <Post 
                timestamp={post.timestamp}
                title={post.title} 
                body={post.body} 
                author={post.author}
                click={() => this.props.clicked(post.id)} 
                key={post.id}
                id={post.id}/>
        })
    }
}
export default Posts