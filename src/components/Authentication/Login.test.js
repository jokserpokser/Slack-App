import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from './Login';
import renderer from "react-test-renderer";

test('renders without crashing', () => {
  render(
    <Router>
      <Login />
    </Router>
  );
});

test("snapshot for login", () => {
  const login = renderer.create(
    <Router>
      <Login />
    </Router>
  ).toJSON();
  expect(login).toMatchSnapshot();
});
