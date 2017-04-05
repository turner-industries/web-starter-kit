/** @jsx createElement */
import {createElement, Component} from 'react';
import autobind from 'autobind-decorator';

import api from "store/api";
import Page from 'layout/Page';
import BackButton from 'layout/BackButton';
import UserForm from './UserForm';

@autobind class UserEdit extends Component {
  state={
    loading: false,
    user: {},
  }

  async componentWillMount() {
    const {match} = this.props;
    const userId = parseInt(match.params.userId, 10);
    this.setState({loading: true});
    const {result} = await api.get(`users/${userId}`);
    this.setState({
      user: result,
      loading: false,
    });
  }

  async _save(user) {
    const {history} = this.props;
    await api.put('users', user);
    history.push('/users');
  }

  render() {
    const {user, loading} = this.state;
    return (
      <Page
        title="Edit User"
        loading={loading}
        metaContent={<BackButton to="/users" title="Back to Users" />}
      >
        {
          !loading &&
          <UserForm
            user={user}
            onSave={this._save}
            confirm="Are you sure you want to update this user?"
          />
        }
      </Page>
    );
  }
}

export default UserEdit;
