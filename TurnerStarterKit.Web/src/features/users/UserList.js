/** @jsx createElement */
import { createElement, Component } from "react";
import { Table } from "semantic-ui-react";
import autobind from 'autobind-decorator';

@autobind
class UserList extends Component {
  _renderRow(user) {
    const { onSelect } = this.props;
    return (
      <Table.Row key={user.id} onClick={() => onSelect(user)}>
        <Table.Cell>{user.firstName}</Table.Cell>
        <Table.Cell>{user.lastName}</Table.Cell>
        <Table.Cell>{user.userName}</Table.Cell>
        <Table.Cell>{user.active ? 'Yes' : 'No'}</Table.Cell>
      </Table.Row>
    );
  }
  render() {
    const { users } = this.props;

    return (
      <Table celled striped selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>First Name</Table.HeaderCell>
            <Table.HeaderCell>Last Name</Table.HeaderCell>
            <Table.HeaderCell>User Name</Table.HeaderCell>
            <Table.HeaderCell>Active</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {users.map(this._renderRow)}
        </Table.Body>
      </Table>
    );
  }
}

export default UserList;
