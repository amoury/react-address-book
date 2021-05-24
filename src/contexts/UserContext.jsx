import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useUserQuery } from '../hooks/useUserQuery';
import { LIMIT } from 'components/pagination/Pagination';

const defaultValue = {
  users: [],
  totalResults: 10,
  isLoading: false,
  isError: false,
  activePage: 1,
  searchTerm: '',
  setSearchTerm: () => undefined,
  setActivePage: () => undefined,
};

export const UserContext = createContext(defaultValue);

export const UserProvider = (props) => {
  const [activePage, setActivePage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const { data, isLoading, isError, isSuccess } = useUserQuery();
  const [filteredResults, setFilteredResults] = useState([]);

  const getSearchResults = useCallback(() => {
    setActivePage(1);
    if (!searchTerm) return data.results;
    const searchResults = data.results.filter((user) => {
      const { first, last } = user.name;
      const query = searchTerm.toLowerCase();
      return (
        first.toLowerCase().includes(query) ||
        last.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
      );
    });

    return searchResults;
  }, [searchTerm, data]);

  useEffect(() => {
    if (!data) return;
    const searchResults = getSearchResults();
    setFilteredResults(searchResults);
  }, [getSearchResults, data]);

  let visibleUsers;

  if (LIMIT) {
    if (activePage === 1) {
      visibleUsers = filteredResults.slice(0, LIMIT);
    } else {
      visibleUsers = filteredResults.slice(LIMIT * (activePage - 1), LIMIT * activePage);
    }
  }

  const value = {
    users: visibleUsers,
    totalResults: filteredResults.length,
    activePage,
    isLoading,
    isError,
    setActivePage,
    searchTerm,
    setSearchTerm,
    isSuccess,
  };

  return <UserContext.Provider value={value} {...props} />;
};

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error(`useUsersContext must be used within the UsersProvider`);
  }

  return context;
};

export default UserProvider;
