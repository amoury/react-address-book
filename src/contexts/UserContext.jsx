import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useUserQuery } from '../hooks/useUserQuery';
import { LIMIT } from 'components/pagination/Pagination';

// const defaultValue = {
//   users: [],
//   isLoading: false,
//   isError: false,
//   activePage: 1,
//   searchTerm: "",
//   setSearchTerm: () => undefined,
//   setActivePage: () => undefined,
// };

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [activePage, setActivePage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const { data, isLoading, isError } = useUserQuery();
  const [filteredResults, setFilteredResults] = useState([]);

  let visibleUsers;

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

  if (LIMIT) {
    if (activePage === 1) {
      visibleUsers = filteredResults.slice(0, LIMIT);
    } else {
      visibleUsers = filteredResults.slice(LIMIT * (activePage - 1), LIMIT * activePage);
    }
  }

  // console.log('visible User ', visibleUsers);

  const value = {
    users: visibleUsers,
    totalResults: filteredResults.length,
    activePage,
    isLoading,
    isError,
    setActivePage,
    searchTerm,
    setSearchTerm,
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
