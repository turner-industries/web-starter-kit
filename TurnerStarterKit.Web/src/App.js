/** @jsx createElement */
import { createElement, Component } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import MainLayout from 'layout/MainLayout';
import PrivateRoute from 'features/security/PrivateRoute';
import LogIn from 'features/auth/LogIn';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="app-container">
          <Switch>
            <Route path="/auth/login" component={LogIn} />
            <PrivateRoute path="/" component={MainLayout} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
