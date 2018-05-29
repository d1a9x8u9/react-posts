import React, { Component } from 'react';

import Layout from '../components/Layout/Layout'
import EditPost from '../components/Posts/EditPost/EditPost'
import { Route, Switch } from 'react-router-dom'

class App extends Component {
    render () {
        return (
            <Switch>
                <Route path="/" exact component={Layout} />
                <Route path="/edit/:id" component={EditPost} />
            </Switch>
        )
    }
}

export default App;
