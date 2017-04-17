/** @jsx createElement */
import {createElement} from 'react';
import {withRouter} from 'react-router';
import {Link, NavLink} from 'react-router-dom';
import {Icon, Image, Menu} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {APP_NAME} from 'constants';

const AppHeader = ({identity}) => (
  <Menu inverted className="main-header" fixed="top">
    <Menu.Item as={Link} to="/dashboard">
      <Image src={require('../img/logo-block.png')} width={25} centered />
      <span className="main-header-title">
        {APP_NAME}
      </span>
    </Menu.Item>

    <Menu.Item as={NavLink} to="/dashboard">
      Dashboard
    </Menu.Item>

    <Menu.Item as={NavLink} to="/users">
      Users
    </Menu.Item>

    {identity.user &&
      <Menu.Menu position="right">
        <Menu.Item>
          {identity.user.name}
        </Menu.Item>
      </Menu.Menu>}

    {!identity.user &&
      <Menu.Menu position="right">
        <Menu.Item as={NavLink} to="/auth/login">
          <Icon name="lock" />
          Log In
        </Menu.Item>
      </Menu.Menu>}
  </Menu>
);

const mapStateToProps = state => {
  return {
    identity: state.identity,
  };
};

export default withRouter(connect(mapStateToProps)(AppHeader));
