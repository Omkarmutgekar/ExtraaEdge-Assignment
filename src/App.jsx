import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../src/redux/Slices/usersSlice';
import UserList from '../src/components/userList/userList.jsx';
import Loading from './components/Loading/Loading';

function App() {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users.users);
  const loading = useSelector(state => state.users.loading);
  const error = useSelector(state => state.users.error);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div>
      {loading && <Loading />}
      {error && <p>Error: {error}</p>}
      <UserList users={users} />
    </div>
  );
}

export default App;
