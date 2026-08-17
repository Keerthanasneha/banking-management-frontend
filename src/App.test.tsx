import { render, screen } from '@testing-library/react';

import App from './App';
import { AppProviders } from './app/providers/AppProviders';

describe('App', () => {
  it('renders the login page on /login route', () => {
    window.history.pushState({}, '', '/login');

    render(
      <AppProviders>
        <App />
      </AppProviders>,
    );

    expect(
      screen.getByRole('heading', {
        name: /manage your banking/i,
      }),
    ).toBeInTheDocument();
  });
});