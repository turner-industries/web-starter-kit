/** @jsx createElement */
import {createElement} from 'react';
import {Container, Dimmer, Loader, Header} from 'semantic-ui-react';

const Page = ({children, metaContent, title, ...props}) => {
  const loading = props.loading;
  delete props.loading;
  return (
    <Dimmer.Dimmable
      as={Container}
      dimmed={loading}
      className="page-content"
      {...props}
    >
      {!!title &&
        <Header as="h1" className="page-header">
          {title}
        </Header>}

      {!!metaContent &&
        <div className="meta-content-container">
          <Container>
            {metaContent}
          </Container>
        </div>}

      {children}

      <Dimmer active={loading} inverted>
        <Loader>Loading...</Loader>
      </Dimmer>
    </Dimmer.Dimmable>
  );
};

export default Page;
