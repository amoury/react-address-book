import { useQuery } from 'react-query';
import { getUsers } from '../utils/api';

export const useUserQuery = () => {
  const { data, isLoading, error, isSuccess } = useQuery('users', getUsers);
  return { data, isLoading, error, isSuccess };
};
