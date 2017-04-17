/** @jsx createElement */
import {createElement} from 'react';
import {Checkbox, Form, Input} from 'semantic-ui-react';

import ErrorAwareField from 'features/validation/ErrorAwareField';

const UserForm = ({user = {}, errors = {}, children, onSubmit, onChange}) => {
  const {userName, firstName, lastName, active} = user;
  return (
    <Form size="large" onSubmit={onSubmit} error={errors.length > 0}>
      <ErrorAwareField errors={errors.userName}>
        <label>User Name</label>
        <Input
          type="text"
          name="userName"
          value={userName}
          onChange={onChange}
        />
      </ErrorAwareField>

      <Form.Group widths="equal">
        <ErrorAwareField errors={errors.firstName}>
          <label>First Name</label>
          <Input
            name="firstName"
            type="text"
            value={firstName}
            onChange={onChange}
          />
        </ErrorAwareField>

        <ErrorAwareField errors={errors.lastName}>
          <label>Last Name</label>
          <Input
            name="lastName"
            type="text"
            value={lastName}
            onChange={onChange}
          />
        </ErrorAwareField>
      </Form.Group>

      <Form.Field>
        <Checkbox
          label="Active"
          name="active"
          checked={active}
          onChange={(e, {name, checked}) => onChange(e, {name, value: checked})}
        />
      </Form.Field>
      {children}
    </Form>
  );
};

export default UserForm;
