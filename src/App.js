import React, { Component } from 'react';

import Layout from './hoc/Layout/Layout'
import { Route, Switch } from 'react-router-dom'
import Blog from './containers/Blog/Blog'
import notFoundImg from './assets/images/404.png'

class App extends Component {
    render() {
        return (
            <div>
                <Layout>
                    <Switch>
                        <Route path="/" exact component={Blog} />
                        <Route render={() => <img src={notFoundImg} alt="404" />} />
                    </Switch>
                </Layout>
            </div>
        )
    }
}

export default App;
