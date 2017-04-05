/** @jsx createElement */
import { createElement, Component } from "react";
import { NavLink } from "react-router-dom";
import { Button, Checkbox, Confirm, Divider, Form, Input } from "semantic-ui-react";
import autobind from "autobind-decorator";

import validate, {length} from 'features/validation';
import ErrorAwareField from 'features/validation/ErrorAwareField';

const constraints = {
  userName: length(1, 50),
  firstName: length(1, 50),
  lastName: length(1, 50),
};

@autobind
class UserForm extends Component {
  state = {
    open: false,
    userName: "",
    firstName: "",
    lastName: "",
    active: true,
  };

  componentWillMount() {
    const { user } = this.props;
    this.setState(user);
  }

  _handleConfirm(){
    const { onSave } = this.props;
    const {id, userName, firstName, lastName, active} = this.state;

    this.setState({open:false});
    onSave({id, userName, firstName, lastName, active});
  }

  _handleCancel(){
    this.setState({open:false});
  }

  _handleChange(e, { name, value }) {
    this.setState({ [name]: value });
  }

  _handleSubmit(e) {
    e.preventDefault();
    const {id, userName, firstName, lastName, active} = this.state;
    const { confirm, onSave } = this.props;

    const validationResult = validate(
      {id, userName, firstName, lastName, active},
      constraints,
      {format: "objectMap"}
    );

    if(validationResult){
      this.setState({errors: validationResult});
    } else if(!!confirm) {
      this.setState({open:true});
    } else {
      this.setState({open:false});
      onSave({id, userName, firstName, lastName, active});
    }
  }

  render() {
    const { userName, firstName, lastName, active, open, errors = {} } = this.state;
    const { cancelUrl = "/users", confirm } = this.props;
    return (
      <Form
        size="large"
        onSubmit={this._handleSubmit}
        error={errors.length > 0}
      >
        <ErrorAwareField errors={errors.userName}>
          <label>User Name</label>
          <Input
            type="text"
            name="userName"
            value={userName}
            onChange={this._handleChange}
          />
        </ErrorAwareField>

        <ErrorAwareField errors={errors.firstName}>
          <label>First Name</label>
          <Input
            name="firstName"
            type="text"
            value={firstName}
            onChange={this._handleChange}
          />
        </ErrorAwareField>

        <ErrorAwareField errors={errors.lastName}>
          <label>Last Name</label>
          <Input
            name="lastName"
            type="text"
            value={lastName}
            onChange={this._handleChange}
          />
        </ErrorAwareField>

        <Form.Field>
          <Checkbox
            label='Active'
            name="active"
            checked={active}
            onChange={(e, { name, checked }) => this._handleChange(e, { name, value:checked })}
          />
        </Form.Field>

        <Divider />

        <Button
          type="submit"
          primary
          floated="right"
        >
          Save
        </Button>

        <Button
          type="button"
          basic
          as={NavLink}
          to={cancelUrl}
          floated="right"
        >
          Cancel
        </Button>

        <Confirm
          open={open}
          content={confirm}
          onCancel={this._handleCancel}
          onConfirm={this._handleConfirm}
        />
      </Form>
    );
  }
}

export default UserForm;
