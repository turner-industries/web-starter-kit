/** @jsx createElement */
import {createElement} from 'react';
import {Header, Segment} from 'semantic-ui-react';

const Section = ({children, title}) => (
  <div style={{marginBottom: '20px'}}>
    <Header inverted attached="top">
      {title}
    </Header>
    <Segment attached style={{background: '#f9f9f9'}}>
      {children}
    </Segment>
  </div>
);

export default Section;
