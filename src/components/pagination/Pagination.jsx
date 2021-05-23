import { Pagination } from 'semantic-ui-react';
import { useUserContext } from 'contexts/UserContext';

export const LIMIT = 20; // No. of results to render at a time

const CustomPagination = () => {
  const { activePage, setActivePage, totalResults } = useUserContext();

  const paginationProps = {
    secondary: true,
    totalPages: totalResults / LIMIT,
    size: 'mini',
    ellipsisItem: null,
    firstItem: null,
    lastItem: null,
    boundaryRange: 1,
  };

  const handlePagination = (e, { activePage }) => {
    setActivePage(activePage);
  };

  if (paginationProps.totalPages < 2) return null;

  return (
    <Pagination {...paginationProps} activePage={activePage} onPageChange={handlePagination} />
  );
};

export default CustomPagination;
