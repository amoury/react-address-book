import { createContext, useContext, useState, useEffect, useReducer } from 'react';
import { useUserQuery } from '../hooks/useUserQuery';
import { getPaginatedData, performSearch, sortBy } from 'utils/helpers';

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
  const [sortConfig, setSortConfig] = useState({ column: null, direction: null });

  useEffect(() => {
    if (!data) return;
    setActivePage(1);
    const searchResults = performSearch(data.results, searchTerm);
    setFilteredResults(searchResults);
  }, [data, searchTerm]);

  const handleSort = (column) => {
    if (column === sortConfig.column) {
      const direction = sortConfig.direction === 'ascending' ? 'descending' : 'ascending';
      setSortConfig({ ...sortConfig, direction });
      return;
    }
    setSortConfig({ column, direction: 'ascending' });
  };

  let visibleUsers = filteredResults;

  if (sortConfig.column) {
    visibleUsers = sortBy(filteredResults, sortConfig.column, sortConfig.direction);
  }

  visibleUsers = getPaginatedData(visibleUsers, activePage);

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
    handleSort,
    sortConfig,
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
