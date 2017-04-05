/** @jsx createElement */
import { createElement, Component } from "react";
import { NavLink } from "react-router-dom";
import { Button, Grid, Icon, Form, Message } from "semantic-ui-react";
import autobind from "autobind-decorator";

import api from "store/api";
import Page from "layout/Page";
import Pagination from "layout/Pagination";
import UserList from "./UserList";

@autobind
class UsersIndex extends Component {
  state = {
    loading: false,
    items: [],
    pageNumber: 1,
    pageSize: 10,
    totalItemCount: 10,
    search: '',
  };

  componentWillMount() {
    this._loadPage(1);
  }

  _handleSearch(e) {
    e.preventDefault();
    this._loadPage(1);
  }

  async _loadPage(page) {
    this.setState({loading: true});

    const { search } = this.state;
    const {result} = await api.get('users', {
      pageNumber: page,
      pageSize: 10,
      searchField: search,
    });

    this.setState({
      ...result,
      loading: false,
    });
  }

  _onRowSelect(user) {
    const { history } = this.props;
    history.push(`/users/${user.id}`);
  }

  _reset(e) {
    e.preventDefault();
    this.setState(
      () => ({search: ''}),
      () => this._loadPage(1)
    );
  }

  render() {
    const { loading, items, pageSize, totalItemCount, pageNumber, search } = this.state;

    return (
      <Page title="Users" loading={loading}>
        <Form
          onSubmit={this._handleSearch}
        >
          <Grid columns={2}>
            <Grid.Column>
              <Form.Input
                name="search"
                value={search}
                icon={
                  <Icon onClick={this._reset} name='close' circular link />
                }
                onChange={(e, {name, value}) => this.setState({[name]: value})}
                placeholder="Search Users..."
                fluid
              />
            </Grid.Column>
            <Grid.Column>
              <Button type="submit">
                Search
              </Button>
              <Button primary as={NavLink} to="/users/add" floated="right">
                <Icon name="plus" />
                Add New
              </Button>
            </Grid.Column>
           </Grid>
        </Form>

        {!!items.length &&
          <div>
            <UserList users={items} onSelect={this._onRowSelect} />
            <Pagination
              currentPage={pageNumber}
              pageSize={pageSize}
              totalCount={totalItemCount}
              onPageChange={this._loadPage}
            />
          </div>}

        {!items.length &&
          !loading &&
          <Message color="yellow">No Users</Message>}
      </Page>
    );
  }
}

export default UsersIndex;
