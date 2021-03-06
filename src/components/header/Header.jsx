import { useLocation, Link } from 'react-router-dom';
import { Input, Button, Icon, Image } from 'semantic-ui-react';
import { useViewport } from 'hooks/useViewport';
import { useUserContext } from 'contexts/UserContext';

import styles from './Header.module.css';

export const Header = ({ viewType, setViewType }) => {
  const { searchTerm, setSearchTerm } = useUserContext();
  const { width } = useViewport();
  let { pathname, state: user } = useLocation();

  const userDetailsPage = Boolean(pathname.match(/user/));

  const handleChange = (e, { value }) => {
    setSearchTerm(value);
  };

  const handleViewChange = () => {
    if (viewType === 'list') {
      return setViewType('map');
    }
    return setViewType('list');
  };

  const renderViewToggleButton = () => {
    let buttonText = viewType === 'map' ? 'List' : 'Map';
    const buttonProps = {
      icon: true,
      onClick: handleViewChange,
    };

    if (width > 600) {
      buttonProps.labelPosition = 'right';
    }

    return (
      <Button data-testid="toggle-view-btn" role="button" {...buttonProps}>
        <Icon name={viewType === 'map' ? `th list` : 'world'} />
        {width > 600 && buttonText}
      </Button>
    );
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.mainLogo}>
        <Link to="/">
          <h1>The Address Book</h1>
        </Link>
      </div>
      {userDetailsPage && (
        <div>
          <span>User Detail Page</span>
          {user && user.picture && (
            <Image className={styles.userImage} src={user.picture.thumbnail} avatar />
          )}
        </div>
      )}
      {!userDetailsPage && (
        <div className={styles.searchBox}>
          <Input
            fluid
            className={styles.searchInput}
            icon="search"
            value={searchTerm}
            onChange={handleChange}
            placeholder="Search by name or email..."
          />
          {!!searchTerm && (
            <Button
              role="button"
              data-testid="clear-btn"
              circular
              icon
              onClick={() => setSearchTerm('')}
            >
              <Icon name="close" />
            </Button>
          )}
        </div>
      )}
      {!userDetailsPage && <div className="view-toggle">{renderViewToggleButton()}</div>}
    </nav>
  );
};

export default Header;
