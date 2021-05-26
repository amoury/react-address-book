import { LIMIT } from 'components/pagination/Pagination';
import _get from 'lodash/get';

export const performSearch = (users, searchTerm) => {
  if (!searchTerm) return users;
  return users.filter((user) => {
    const { first, last } = user.name;
    const query = searchTerm.toLowerCase();
    return (
      first.toLowerCase().includes(query) ||
      last.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query)
    );
  });
};

export const sortBy = (data, column, direction = 'ascending') => {
  if (!column) return data;
  return data.sort((user1, user2) => {
    const user1Val = _get(user1, column);
    const user2Val = _get(user2, column);
    if (!user1Val || !user2Val) return;

    if (direction === 'ascending') {
      return user1Val.localeCompare(user2Val);
    }
    return user2Val.localeCompare(user1Val);
  });
};

export const getPaginatedData = (data, currentPage) => {
  const start = currentPage * LIMIT - LIMIT;
  const end = start + LIMIT;
  return data.slice(start, end);
};
