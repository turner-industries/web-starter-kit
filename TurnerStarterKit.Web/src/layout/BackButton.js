/** @jsx createElement */
import { createElement } from "react";
import { Link } from 'react-router-dom';
import { Button, Icon } from "semantic-ui-react";

const BackButton = ({to, title}) => (
  <Button
    as={Link}
    to={to}
    size="mini"
    className="back-button">
    <Icon name="arrow left" />
    {title}
  </Button>
);

export default BackButton;
