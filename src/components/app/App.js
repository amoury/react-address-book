import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { useUserContext } from 'contexts/UserContext';
import Header from 'components/header/Header';
import Loader from 'components/loader/Loader';
import UserMap from 'components/userMap/UserMap';
import UserTable from 'components/userTable/UserTable';
import UserDetails from 'components/userDetails/UserDetails';

import styles from './App.module.css';

function App() {
  const [viewType, setViewType] = useState('list');
  const { isLoading } = useUserContext();

  return (
    <Router>
      <main>
        <Header viewType={viewType} setViewType={setViewType} />
        {isLoading ? (
          <Loader />
        ) : (
          <Switch>
            <Route path="/user/:emailId">
              <UserDetails />
            </Route>
            <Route path="/" exact>
              <section data-testid="content" className={styles.content}>
                {viewType === 'map' && <UserMap />}
                {viewType === 'list' && <UserTable />}
              </section>
            </Route>
          </Switch>
        )}
      </main>
    </Router>
  );
}

export default App;
