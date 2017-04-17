/** @jsx createElement */
import {createElement} from 'react';
import {Route, Redirect, Switch} from 'react-router-dom';

import AppHeader from './AppHeader';
import AppFooter from './AppFooter';
import DashboardIndex from 'features/dashboard/DashboardIndex';
import UserRoutes from 'features/users/UserRoutes';

const MainLayout = () => (
  <div className="flex-wrapper">
    <AppHeader />
    <Switch>
      <Route exact path="/dashboard" component={DashboardIndex} />
      <Route path="/users" component={UserRoutes} />
      <Redirect to="/dashboard" />
    </Switch>
    <AppFooter />
  </div>
);

export default MainLayout;
