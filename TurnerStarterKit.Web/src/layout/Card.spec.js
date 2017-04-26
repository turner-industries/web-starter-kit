import Card from './Card';
import * as React from 'react';
import {create} from 'react-test-renderer';

describe('component', () => {
  it('should render with title and children', () => {
    const tree = create(<Card title="Title" children="Content" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should allow skipping children', () => {
    const tree = create(<Card children="Content" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});