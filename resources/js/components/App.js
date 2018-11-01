import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './Header';
import ProjectsList from './ProjectsList';
import NewProject from './NewProject';
import SingleProject from './SingleProject' ;

class App extends Component {
    render ()
    {
        return (
            <BrowserRouter>
                <div>
                    <Header />
                    <Switch>
                        <Route exact path="/" Component={ProjectsList} />
                        <Route path="/create" Component={NewProject} />
                        <Route path="/:id" Component={SingleProject} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

ReactDom.render(<App />, document.getElementById('app'));
