import { screen } from '@testing-library/react';
import { customRender } from 'utils/testing-utils';
import App from 'components/app/App';

test('Loader renders while the data is loading', () => {
  const providerProps = {
    value: { isLoading: true },
  };
  customRender(<App />, { providerProps });
  expect(screen.getByText(/loading/i)).toBeInTheDocument();
});
