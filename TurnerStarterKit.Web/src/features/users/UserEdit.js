/** @jsx createElement */
import {createElement, Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Button, Confirm} from 'semantic-ui-react';
import autobind from 'autobind-decorator';

import api from 'store/api';
import Page from 'layout/Page';
import BackButton from 'layout/BackButton';
import validate, {length} from 'features/validation';
import UserForm from './UserForm';

const constraints = {
  userName: length(1, 50),
  firstName: length(1, 50),
  lastName: length(1, 50),
};

class UserEdit extends Component {
  state = {
    loading: false,
    open: false,
    user: {
      userName: '',
      firstName: '',
      lastName: '',
      active: true,
    },
  };

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

  @autobind _handleConfirm() {
    const {id, userName, firstName, lastName, active} = this.state;

    this.setState({open: false});
    this._save({id, userName, firstName, lastName, active});
  }

  @autobind _handleCancel() {
    this.setState({open: false});
  }

  @autobind _handleChange(e, {name, value}) {
    this.setState(prevState => ({
      ...prevState,
      user: {
        ...prevState.user,
        [name]: value,
      },
    }));
  }

  @autobind _handleSubmit(e) {
    e.preventDefault();
    const {id, userName, firstName, lastName, active} = this.state.user;
    const {confirm} = this.props;

    const validationResult = validate(
      {id, userName, firstName, lastName, active},
      constraints,
      {format: 'objectMap'},
    );

    if (validationResult) {
      this.setState({errors: validationResult});
    } else if (!!confirm) {
      this.setState({open: true});
    } else {
      this.setState({open: false});
      this._save({id, userName, firstName, lastName, active});
    }
  }

  async _save(user) {
    const {history} = this.props;
    await api.put('users', user);
    history.push('/users');
  }

  render() {
    const {user, loading, errors, open} = this.state;
    return (
      <Page
        title="User Information"
        loading={loading}
        metaContent={<BackButton to="/users" title="Back to Users" />}
      >
        {!loading &&
          <UserForm
            user={user}
            errors={errors}
            onChange={this._handleChange}
            onSubmit={this._handleSubmit}
          >
            <Button type="submit" primary floated="right">
              Save
            </Button>

            <Button
              type="button"
              basic
              as={NavLink}
              to="/users"
              floated="right"
            >
              Cancel
            </Button>

            <Confirm
              open={open}
              content="Are you sure you want to update this user?"
              onCancel={this._handleCancel}
              onConfirm={this._handleConfirm}
            />
          </UserForm>}
      </Page>
    );
  }
}

export default UserEdit;
