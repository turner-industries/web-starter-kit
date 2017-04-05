import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Welcome from './Welcome';
import Pagination from '../src/layout/Pagination';

import 'semantic-ui-css/semantic.css';

storiesOf('Welcome', module)
  .add('to Storybook', () => (
    <Welcome showApp={linkTo('Button')}/>
  ));

storiesOf('Pagination', module)
  .add('first page', () => (
    <Pagination
      currentPage={1}
      pageSize={10}
      totalCount={50}
      onPageChange={action('pageChanged')}
    />
  ))
  .add('middle page', () => (
    <Pagination
      currentPage={3}
      pageSize={10}
      totalCount={50}
      onPageChange={action('pageChanged')}
    />
  ))
  .add('last page', () => (
    <Pagination
      currentPage={5}
      pageSize={10}
      totalCount={50}
      onPageChange={action('pageChanged')}
    />
  ))
  .add('page out of range', () => (
    <Pagination
      currentPage={6}
      pageSize={10}
      totalCount={50}
      onPageChange={action('pageChanged')}
    />
  ));
