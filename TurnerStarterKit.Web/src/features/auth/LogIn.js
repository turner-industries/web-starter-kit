/** @jsx createElement */
import { createElement, Component } from 'react';
import { Container, Header, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { Redirect } from 'react-router-dom';

import {APP_NAME} from 'constants';
import { actions } from 'store';
import AppFooter from 'layout/AppFooter';

export class LogIn extends Component {
  componentWillMount(){
    this.props.login();
  }
  render(){
    const {identity} = this.props;

    return (
      <Container text>
        <div style={{boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)'}}>
          <Header textAlign="center" attached="top" inverted>
            Welcome to {APP_NAME}
          </Header>
          <Segment attached style={{
            paddingTop: '20px',
            marginBottom: '20px',
          }}
          loading={identity.loginLoading}>
            Logging in...
          </Segment>
        </div>
        <AppFooter></AppFooter>
        {
          identity.user &&
          <Redirect to="/dashboard" />
        }
      </Container>
    );
  }
}


const mapStateToProps = (state) => ({
  identity: state.identity,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(actions.identity, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
