import { useState } from 'react';
import { Input, Button, Icon } from 'semantic-ui-react';
import { useViewport } from 'hooks/useViewport';
// import { useUsersContext } from "../../contexts/UsersContext";

import styles from './Header.module.css';

const Header = () => {
  // const { searchTerm, setSearchTerm } = useUsersContext();
  const [searchTerm, setSearchTerm] = useState('');
  const { width } = useViewport();

  const viewType = 'map';

  const handleChange = (e, { value }) => {
    setSearchTerm(value);
  };

  const handleViewChange = () => {
    console.log('view change');
    // if (viewType === "list") {
    //   return setViewType("map");
    // }
    // return setViewType("list");
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
      <Button {...buttonProps}>
        <Icon name={viewType === 'map' ? `th list` : 'world'} />
        {width > 600 && buttonText}
      </Button>
    );
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.mainLogo}>
        <h1>The Address Book</h1>
      </div>
      <div className={styles.searchBox}>
        <Input
          fluid
          className={styles.searchInput}
          icon="search"
          value={searchTerm}
          onChange={handleChange}
          placeholder="Search..."
        />
        {!!searchTerm && (
          <Button circular icon onClick={() => setSearchTerm('')}>
            <Icon name="close" />
          </Button>
        )}
      </div>
      <div className="view-toggle">{renderViewToggleButton()}</div>
    </nav>
  );
};

export default Header;
