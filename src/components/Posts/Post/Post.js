import React from 'react'

const post = (props) => {
    return (
        <div>
            <p  onClick={props.click}>Title: {props.title}</p> 
            <p>Body: {props.body}</p>
            <input text="text"  onChange={props.change} value={props.title} />
        </div>
    )
}

export default post