
import { createSlice, createAsyncThunk,nanoid } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    return response.data;
  }
);

export const fetchAvatar = createAsyncThunk(
  'users/fetchAvatar',
  async (username) => {
    const response = await axios.get(`https://api.dicebear.com/8.x/avataaars/svg?seed=${username}`);
    // console.log(response.data);

    return { username, data: response.data }; // Return username along with data
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    loading: false,
    error: null,
    avatars: {},
  },
  reducers: {
    updateUser(state, action) {
      const { id, newData } = action.payload;
      // console.log('redux',newData) 
      const userIndex = state.users.findIndex((user) => user.id === id);
      // console.log('userIndex',userIndex);
      if (userIndex !== -1) {
        state.users[userIndex] = { ...state.users[userIndex], ...newData };
      }
    },
    deleteUser(state, action) {
      const userId = action.payload; 
      const filteredUsers = state.users.filter((user) => user.id !== userId);
      state.users = filteredUsers;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        state.users = state.users.map((user) => ({
          ...user,
          id: nanoid(),
        }));

      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchAvatar.fulfilled, (state, action) => {
        const { username, data } = action.payload;
        state.avatars[username] = data;
        // console.log(state.avatars[username]);

        // state.avatars = action.payload;

        
      });
  },
});

export const { updateUser , deleteUser} = usersSlice.actions; 
export default usersSlice.reducer;
