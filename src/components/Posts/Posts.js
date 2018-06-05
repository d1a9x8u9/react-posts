import React, { Component } from 'react'

import Post from './Post/Post'

class Posts extends Component {
    render() {
        return this.props.posts.map( post => {
            return <Post 
                {...post}
                delete={() => this.props.deleted(post.id)} 
                updatePost= {this.props.updatedPost}
                key={post.id}
            />
        })
    }
}
export default Posts