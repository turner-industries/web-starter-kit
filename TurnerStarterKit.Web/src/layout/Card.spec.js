import Card from './Card';
import React from 'react';
import {create} from 'react-test-renderer';

describe('Component: Card', () => {
  it('should render with title and children', () => {
    const tree = create(<Card title="Title" children="Content" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should allow skipping title', () => {
    const tree = create(<Card children="Content" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
