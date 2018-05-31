import React, { Component } from 'react';

import Layout from './hoc/Layout/Layout'
import EditPost from './components/Posts/EditPost/EditPost'
import { Route, Switch } from 'react-router-dom'
import Blog from './containers/Blog/Blog'

class App extends Component {
    render() {
        return (
            <div>
                <Layout>
                    <Switch>
                        <Route path="/edit/:id" component={EditPost} />
                        <Route path="/" exact component={Blog} />
                    </Switch>
                </Layout>
            </div>
        )
    }
}

export default App;
