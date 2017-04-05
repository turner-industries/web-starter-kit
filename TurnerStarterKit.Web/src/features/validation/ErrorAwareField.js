/** @jsx createElement */
import { createElement } from "react";
import { Form } from "semantic-ui-react";

const ErrorAwareField = ({errors = [], children}) => {
  const showErrors = errors.length > 0;
  return (
    <Form.Field error={showErrors}>
      {children}
      {
        showErrors &&
        <ul className="field-errors">
          {errors.map(x => <li key={x}>{x}</li>)}
        </ul>
      }
    </Form.Field>
  );
};

export default ErrorAwareField;
