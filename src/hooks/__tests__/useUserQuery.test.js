import { renderHook } from '@testing-library/react-hooks';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useUserQuery } from '../useUserQuery';
import server from 'mocks/server';
import mockData from 'mocks/data';

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

const queryClient = new QueryClient();

const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

test('useUserQuery returns the correct data', async () => {
  const { result, waitFor } = renderHook(() => useUserQuery(), { wrapper });
  await waitFor(() => result.current.isSuccess);
  expect(result.current.data).toEqual(mockData);
});
