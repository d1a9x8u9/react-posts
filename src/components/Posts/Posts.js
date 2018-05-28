import React, { Component } from 'react'

import Post from './Post/Post'

const posts = (props) => props.posts.map( (post, index) => {
        return <Post 
            title={post.title} 
            body={post.body} 
            click={() => props.clicked(index)} 
            change={(event) => props.changed(event, post.id)}
            key={post.id}/>
    })

export default posts