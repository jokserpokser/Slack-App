import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Chat from './Chat';
import store from '../../redux/store'; // assuming your store setup is in this file
import renderer from 'react-test-renderer';

describe('<Chat />', () => {
  test('renders chat component', async () => {
    render(
      <Provider store={store}>
        <Router>
          <Chat />
        </Router>
      </Provider>
    );

    await waitFor(() => {
      expect(store.getState().chat.selectedChannel).toBeDefined();
    });

    // const heading = screen.getByRole('heading');
    // expect(heading).toBeInTheDocument();
    // expect(heading).toHaveTextContent(/Select a channel/i);
  });
});

test('snapshot test for Chat', async () => {
  let chat;
  await renderer.act(async () => {
    chat = renderer.create(
      <Provider store={store}>
        <Router>
          <Chat />
        </Router>
      </Provider>
    );
  });

  expect(chat.toJSON()).toMatchSnapshot();
});
