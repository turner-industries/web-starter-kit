/** @jsx createElement */
import {createElement} from 'react';
import {Route, Switch} from 'react-router-dom';

import PrivateRoute from 'features/security/PrivateRoute';
import UsersIndex from 'features/users/UsersIndex';
import UserAdd from 'features/users/UserAdd';
import UserEdit from 'features/users/UserEdit';

const UserRoutes = ({match}) => (
  <Switch>
    <Route exact path={match.path} component={UsersIndex} />
    <PrivateRoute
      claim="users/modify"
      path={`${match.path}/add`}
      component={UserAdd}
    />
    <PrivateRoute
      claim="users/modify"
      path={`${match.path}/:userId`}
      component={UserEdit}
    />
  </Switch>
);

export default UserRoutes;
