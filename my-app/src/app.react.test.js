import React from 'react';
import componentConverTemp from '../src/components/CurrentWeather/Weather';
import renderer from 'react-test-renderer';

test('Check to make sure the DOM tree is what is rendered', () => {
  const component = renderer.create(
    <componentConverTemp />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});