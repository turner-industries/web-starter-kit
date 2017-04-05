/** @jsx createElement */
import { createElement } from "react";
import { Route, Redirect, Switch } from 'react-router-dom';

import AppHeader from './AppHeader';
import AppFooter from './AppFooter';
import DashboardIndex from 'features/dashboard/DashboardIndex';
import UserRoutes from 'features/users/UserRoutes';

const MainLayout = ({history, location}) => (
  <div className="flex-wrapper">
    <AppHeader history={history} location={location}></AppHeader>
    <Switch>
      <Route exact path="/dashboard" component={DashboardIndex}/>
      <Route path="/users" component={UserRoutes}/>
      <Redirect to="/dashboard"></Redirect>
    </Switch>
    <AppFooter></AppFooter>
  </div>
);

export default MainLayout;
