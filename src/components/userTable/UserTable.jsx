import { Link } from 'react-router-dom';
import { Table, Image, Button, Icon } from 'semantic-ui-react';
import { useUserContext } from 'contexts/UserContext';
import Pagination from 'components/pagination/Pagination';
import styles from './UserTable.module.css';

const UserTable = () => {
  const { users } = useUserContext();
  return (
    <div className={styles.tableWrapper}>
      <Table sortable celled fixed selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell sorted={null} onClick={() => console.log('name')}>
              Name
            </Table.HeaderCell>
            <Table.HeaderCell sorted={null} onClick={() => console.log('age')}>
              Gender
            </Table.HeaderCell>
            <Table.HeaderCell sorted={null} onClick={() => console.log('gender')}>
              Phone
            </Table.HeaderCell>
            <Table.HeaderCell sorted={null} onClick={() => console.log('email')}>
              Email
            </Table.HeaderCell>
            <Table.HeaderCell>View</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {!!users.length &&
            users.map((user) => (
              <Table.Row key={user.email}>
                <Table.Cell>
                  <Image src={user.picture.thumbnail} avatar />
                  <span>{`${user.name.first} ${user.name.last}`}</span>
                </Table.Cell>
                <Table.Cell>{user.gender}</Table.Cell>
                <Table.Cell>{user.phone}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>
                  <Link to={{ pathname: `/user/${user.email}`, state: user }}>
                    <Button size="tiny" color="teal" icon labelPosition="right">
                      View
                      <Icon name="right arrow" />
                    </Button>
                  </Link>
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
      <div className={styles.tableFooter}>
        <Pagination />
      </div>
    </div>
  );
};

export default UserTable;
