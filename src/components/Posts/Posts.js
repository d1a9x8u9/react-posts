import React, { Component } from 'react'

import Post from './Post/Post'

class Posts extends Component {
    render() {
        return this.props.posts.map( (post, index) => {
            return <Post 
                title={post.title} 
                body={post.body} 
                click={() => this.props.clicked(index)} 
                change={(event) => this.props.changed(event, post.id)}
                key={post.id}/>
        })
    }
}
export default Posts