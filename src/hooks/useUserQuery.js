import { useQuery } from 'react-query';
import { getUsers } from '../utils/api';
import _get from 'lodash/get';

export const useUsersQuery = () => {
  const { data, isLoading, isError } = useQuery(['users'], getUsers);

  const users = _get(data, 'results', []);

  return { users, isLoading, isError };
};
