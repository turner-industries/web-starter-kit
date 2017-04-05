/** @jsx createElement */
import { createElement, Component } from "react";
import { Label, Icon } from "semantic-ui-react";
import autobind from 'autobind-decorator';

import api from "store/api";
import Page from "layout/Page";
import BackButton from "layout/BackButton";
import UserForm from "./UserForm";

@autobind
class UserAdd extends Component {
  async _save(user){
    const {history} = this.props;
    await api.post('users', user);
    history.push('/users');
  };

  render() {
    return (
      <Page
        title="Add New User"
        metaContent={
          (
            <div>
              <BackButton to="/users" title="Back to Users" />
              <span style={{ float: "right" }}>
                <Label color="orange">
                  <Icon name="exclamation" /> Confirmation Required
                </Label>
              </span>
            </div>
          )
        }
      >
        <UserForm
          user={{}}
          onSave={this._save}
        />
      </Page>
    );
  }
}

export default UserAdd;
