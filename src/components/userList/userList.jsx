
import React from 'react';
import UserCard from '../User/UserCard';


function UserList({ users }) {
  return (
    <div className="row row-cols-1 row-cols-sm-4 g-4">
      {users.map(user => (
        <div key={user.id} className="col">
          {/* {console.log('card id', user)} */}
          <UserCard user={user} />
        </div>
      ))}
    
    </div>
  );
}

export default UserList;
