import { screen, waitFor } from '@testing-library/react';
import server from 'mocks/server';
import user from '@testing-library/user-event';
import { customRender } from 'utils/testing-utils';
import mockData from 'mocks/data';
import App from './App';

beforeAll(() => server.listen());
beforeEach(() => customRender(<App />));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe('App', () => {
  test('renders Loader', () => {
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test('should render content once the data is available', async () => {
    await waitFor(() => {
      expect(screen.getByTestId('user-table')).toBeInTheDocument();
      mockData.results.forEach((user) => {
        expect(screen.getByText(user.email, { exact: false })).toBeInTheDocument();
      });
    });
  });

  test('toggle view button works correctly', async () => {
    const toggleBtn = screen.getByTestId('toggle-view-btn');
    expect(toggleBtn).toHaveTextContent(/map/i);
    await waitFor(() => expect(screen.getByTestId('user-table')).toBeInTheDocument());
    user.click(toggleBtn);
    expect(toggleBtn).toHaveTextContent(/list/i);
    expect(screen.getByTestId('user-map')).toBeInTheDocument();
    user.click(toggleBtn);
    expect(toggleBtn).toHaveTextContent(/map/i);
    expect(screen.getByTestId('user-table')).toBeInTheDocument();
  });
});
