
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAvatar , updateUser ,deleteUser } from '../../redux/Slices/usersSlice';
import Loading from '../Loading/Loading';
import { Heart, Edit3, Trash2 } from 'react-feather';
import './usercard.css';
import EditModal from '../PopupModal/EditModal'

function UserCard({ user }) {
  const [id , setId ] = useState()
  // const cardId =user.id;
  const dispatch = useDispatch();
  const avatarData = useSelector(state => state.users.avatars[user.username]);
  const [isEditing, setIsEditing] = useState(false); 
  const [liked , setLiked] = useState(false)

  useEffect(() => {
    if (!avatarData) {
      dispatch(fetchAvatar(user.username));
    }
  }, [dispatch, user.username, avatarData]);

  const handleLike = () => {
      setLiked(!liked)
  }

  const handleEditClick = () => {
    setIsEditing(true);
    setId(user.id)
  };

  const handleEditSubmit = (updatedUser) => {
    dispatch(updateUser({ id, newData: updatedUser }));
    // console.log('Updated user:', id); 
    setIsEditing(false); 
  };

  const handleEditCancel = () => {
    setIsEditing(false);
  };

  const handleDelete = () => {
    dispatch(deleteUser(user.id)); 
    console.log("deleted");
  };

  return (
    <div className="card">
      {avatarData ? (
        <img src={`data:image/svg+xml;utf8,${encodeURIComponent(avatarData)}`} className="card-img-top" alt="Avatar" />
      ) : (
        <Loading />
      )}
      <div className="card-body">
        <h5 className="card-title">{user.name}</h5>
        <p className="card-text">Email: {user.email}</p>
        <p className="card-text">Phone: {user.phone}</p>
        <p className="card-text">Website: {user.website}</p>
        {/* <p className="card-text">Address: {user.address.street}, {user.address.city}</p> */}
        {/* <p className="card-text">Company: {user.company.name}</p> */}
      </div>
      <div className="card-footer">
        <div>
          {liked ? (
            <Heart className="icon" color="red"  onClick={handleLike}/>
          ) : (
            <Heart className="icon" onClick={handleLike}/>
          )}
          {/* <Heart className="icon"  onClick={handleLike}/> */}
        </div>
        <div>
          <Edit3 className="icon" onClick={handleEditClick} />
        </div>
        <div>
          <Trash2 className="icon" onClick={handleDelete} />
        </div>
      </div>

      {isEditing && (
        <EditModal
          user={user} 
          onSubmit={handleEditSubmit} 
          onCancel={handleEditCancel} 
        />
      )}
    </div>
  );
}

export default UserCard;
