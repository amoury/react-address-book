import { useQuery } from 'react-query';
import { getUsers } from '../utils/api';

export const useUserQuery = () => {
  const { data, isLoading, isError } = useQuery('users', getUsers);
  return { data, isLoading, isError };
};
