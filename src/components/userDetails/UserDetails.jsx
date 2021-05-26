import { useLocation } from 'react-router-dom';
import { Image, Card, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import styles from './UserDetails.module.css';

const UserDetails = () => {
  let location = useLocation();
  const { state: user } = location;

  return (
    <div className={styles.userDetails}>
      <div className={styles.topBar}>
        <Link to="/">
          <div className={styles.backBtn}>
            <Icon name="angle left" />
            <span>Back</span>
          </div>
        </Link>
      </div>
      <Card>
        <Image src={user.picture.large} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{`${user.name.first} ${user.name.last}`}</Card.Header>
          <Card.Meta>{user.email}</Card.Meta>
          <Card.Description>{`${user.location.city}, ${user.location.country}`}</Card.Description>
        </Card.Content>
        <Card.Content className={styles.cardExtra} extra>
          <Icon name="mobile" />
          <span>{user.phone}</span>
        </Card.Content>
      </Card>
    </div>
  );
};

export default UserDetails;
