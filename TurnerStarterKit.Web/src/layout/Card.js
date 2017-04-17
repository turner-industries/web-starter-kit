/** @jsx createElement */
import {createElement} from 'react';
import {Container, Header} from 'semantic-ui-react';

const Card = ({children, title, ...props}) => (
  <div className="card-wrapper">
    <Container className="card-content" {...props}>
      {!!title &&
        <Header as="h1" className="page-header">
          {title}
        </Header>}
      {children}
    </Container>
  </div>
);

export default Card;
