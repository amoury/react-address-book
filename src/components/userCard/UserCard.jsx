import { Card, Image, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const UserCard = ({ user }) => {
  return (
    <Card>
      <Card.Content>
        <Image floated="right" size="mini" src={user.picture.thumbnail} />
        <Card.Header>
          {user.name.first} {user.name.last}
        </Card.Header>
        <Card.Meta>{`${user.location.state}, ${user.location.country}`}</Card.Meta>
      </Card.Content>
      <Card.Content extra>
        <div>
          <Link to={{ pathname: `/user/${user.email}`, state: user }}>
            <Button fluid basic color="teal">
              View Details
            </Button>
          </Link>
        </div>
      </Card.Content>
    </Card>
  );
};

export default UserCard;
