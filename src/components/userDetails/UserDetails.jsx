import { useLocation } from 'react-router-dom';
import { Image, Card, Icon } from 'semantic-ui-react';
import styles from './UserDetails.module.css';

const UserDetails = () => {
  let location = useLocation();
  const { state: user } = location;

  return (
    <div className={styles.userDetails}>
      <span>Back</span>
      <Card>
        <Image src={user.picture.large} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{`${user.name.first} ${user.name.last}`}</Card.Header>
          <Card.Meta>{user.email}</Card.Meta>
          <Card.Description>{`${user.location.city}, ${user.location.country}`}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Icon name="mobile" />
          {user.phone}
        </Card.Content>
      </Card>
    </div>
  );
};

export default UserDetails;
