/** @jsx createElement */
import {createElement, Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Breadcrumb, Button} from 'semantic-ui-react';
import autobind from 'autobind-decorator';

import api from 'store/api';
import Page from 'layout/Page';
import validate, {length} from 'features/validation';
import UserForm from './UserForm';

const constraints = {
  userName: length(1, 50),
  firstName: length(1, 50),
  lastName: length(1, 50),
};

class UserAdd extends Component {
  state = {
    user: {
      userName: '',
      firstName: '',
      lastName: '',
      active: true,
    },
  };

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

  @autobind async _save(user) {
    const {history} = this.props;
    await api.post('users', user);
    history.push('/users');
  }

  render() {
    const {user, errors} = this.state;
    return (
      <Page
        title="User Information"
        metaContent={
          <Breadcrumb>
            <Breadcrumb.Section as={NavLink} to="/users">
              Users
            </Breadcrumb.Section>
            <Breadcrumb.Divider />
            <Breadcrumb.Section active>Add New</Breadcrumb.Section>
          </Breadcrumb>
        }
      >
        <UserForm
          user={user}
          errors={errors}
          onChange={this._handleChange}
          onSubmit={this._handleSubmit}
        >
          <Button type="submit" primary floated="right">
            Save
          </Button>

          <Button type="button" basic as={NavLink} to="/users" floated="right">
            Cancel
          </Button>
        </UserForm>
      </Page>
    );
  }
}

export default UserAdd;
