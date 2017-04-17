/** @jsx createElement */
import {createElement, Component} from 'react';
import {withRouter} from 'react-router';
import {Route, Switch} from 'react-router-dom';

import MainLayout from 'layout/MainLayout';
import PrivateRoute from 'features/security/PrivateRoute';
import LogIn from 'features/auth/LogIn';

class App extends Component {
  render() {
    return (
      <div className="app-container">
        <Switch>
          <Route path="/auth/login" component={LogIn} />
          <PrivateRoute path="/" component={MainLayout} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
