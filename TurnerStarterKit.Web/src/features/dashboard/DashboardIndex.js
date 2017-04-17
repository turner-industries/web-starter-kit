/** @jsx createElement */
import {createElement} from 'react';
import {Header, Rating, Table} from 'semantic-ui-react';
import Card from 'layout/Card';
import RequiresClaim from 'features/security/RequiresClaim';

const DashboardIndex = () => (
  <div className="flex-wrapper">
    <Section1 />

    <RequiresClaim claim="dashboard/section2" render={() => <Section2 />} />
  </div>
);

const Section1 = () => (
  <Card title="Dashboard Goes Here">
    <Table celled padded>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell singleLine>Evidence Rating</Table.HeaderCell>
          <Table.HeaderCell>Effect</Table.HeaderCell>
          <Table.HeaderCell>Efficacy</Table.HeaderCell>
          <Table.HeaderCell>Consensus</Table.HeaderCell>
          <Table.HeaderCell>Comments</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        <Table.Row>
          <Table.Cell>
            <Header as="h2" textAlign="center">A</Header>
          </Table.Cell>
          <Table.Cell singleLine>Power Output</Table.Cell>
          <Table.Cell>
            <Rating icon="star" defaultRating={3} maxRating={3} />
          </Table.Cell>
          <Table.Cell textAlign="right">
            80% <br />
            <a href="#">18 studies</a>
          </Table.Cell>
          <Table.Cell>
            Creatine supplementation is the reference compound for increasing muscular creatine levels; there is
            variability in this increase, however, with some nonresponders.
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            <Header as="h2" textAlign="center">A</Header>
          </Table.Cell>
          <Table.Cell singleLine>Weight</Table.Cell>
          <Table.Cell>
            <Rating icon="star" defaultRating={3} maxRating={3} />
          </Table.Cell>
          <Table.Cell textAlign="right">
            100% <br />
            <a href="#">65 studies</a>
          </Table.Cell>
          <Table.Cell>
            Creatine is the reference compound for power improvement, with numbers from one meta-analysis to assess
            potency
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  </Card>
);

const Section2 = () => (
  <Card title="Some other section">
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
      sed do eiusmod tempor incididunt ut labore et dolore magna
      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
      ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
      aute irure dolor in reprehenderit in voluptate velit esse
      cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit
      anim id est laborum.
    </p>

    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
      sed do eiusmod tempor incididunt ut labore et dolore magna
      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
      ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
      aute irure dolor in reprehenderit in voluptate velit esse
      cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit
      anim id est laborum.
    </p>
  </Card>
);

export default DashboardIndex;
