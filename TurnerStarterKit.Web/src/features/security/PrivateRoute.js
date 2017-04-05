/** @jsx createElement */
import { createElement } from "react";
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ claim, component, user, ...rest }) => {
  const claims = user
    ? user.claims
    : [];

  const canRoute = !!claim
    ? claims.indexOf(claim) > -1
    : !!user;

  return (
    <Route {...rest} render={props => (
      canRoute ? (
        createElement(component, props)
      ) : (
        <Redirect to={{
          pathname: '/auth/login',
          state: { from: props.location },
        }}/>
      )
    )}/>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.identity.user,
  };
};

export default connect(mapStateToProps)(PrivateRoute);
