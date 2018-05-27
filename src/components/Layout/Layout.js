import React from 'react'

import classes from './Layout.css'
import Header from '../Navigation/Header/Header'
import Posts from '../Posts/Posts'

const layout = () => (
    <div>
        <Header />
        <Posts />
    </div>
)

export default layout