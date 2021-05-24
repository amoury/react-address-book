import { useState, useEffect } from 'react';
import ReactMap, { Marker, Popup } from 'react-map-gl';
import { useViewport } from 'hooks/useViewport';
import { useUserContext } from 'contexts/UserContext';
import UserCard from 'components/userCard/UserCard';
import Pagination from 'components/pagination/Pagination';
import styles from './UserMap.module.css';

const UserMap = () => {
  const [viewport, setViewport] = useState({
    latitude: Number(45.4211), //
    longitude: Number(-75.6903),
    zoom: 1,
  });
  const { users } = useUserContext();
  const { width } = useViewport();

  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    if (!users.length) return;
    const firstUser = users[0];
    const { latitude, longitude } = firstUser.location.coordinates;
    setViewport({ zoom: 1, latitude: Number(latitude), longitude: Number(longitude) });
  }, [users]);

  const handleCardClick = (user) => {
    const { latitude: lat, longitude: lng } = user.location.coordinates;
    setViewport({ ...viewport, latitude: Number(lat), longitude: Number(lng) });
    setSelectedUser(user);
  };

  return (
    <div data-testid="user-map" className={styles.userMapWrapper}>
      <div className={styles.userCards}>
        <ul>
          {users.map((user) => (
            <li key={user.email} onClick={() => handleCardClick(user)}>
              <UserCard user={user} />{' '}
            </li>
          ))}
        </ul>
        {Pagination && (
          <div className={styles.pagination}>
            <Pagination />
          </div>
        )}
      </div>

      <ReactMap
        {...viewport}
        className={styles.userMap}
        width={width >= 600 ? '90vw' : '100vw'}
        height={width >= 600 ? '89vh' : '100vh'}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={(viewport) => setViewport(viewport)}
        mapStyle="mapbox://styles/mapbox/light-v10"
      >
        {users.map((user) => (
          <Marker
            key={user.email}
            latitude={Number(user.location.coordinates.latitude)}
            longitude={Number(user.location.coordinates.longitude)}
          >
            <div className={styles.markerPin} onClick={() => handleCardClick(user)}>
              <div className={styles.markerPinInner}>
                <img
                  src={user.picture.thumbnail}
                  alt={`${user.name.first}'s location on the map`}
                />
              </div>
            </div>
          </Marker>
        ))}

        {selectedUser && (
          <Popup
            latitude={Number(selectedUser.location.coordinates.latitude)}
            longitude={Number(selectedUser.location.coordinates.longitude)}
            onClose={() => setSelectedUser(null)}
          >
            <div>
              <UserCard user={selectedUser} />
            </div>
          </Popup>
        )}
      </ReactMap>
    </div>
  );
};

export default UserMap;
