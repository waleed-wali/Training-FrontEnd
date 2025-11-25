import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchUsers,
  addUser as addUserAPI,
  deleteUser as deleteUserAPI,
  updateUser as updateUserAPI,
} from '../../api/usersAPI';

// Fetch all users
export const loadUsers = createAsyncThunk('users/load', async () => {
  const data = await fetchUsers();
  return data;
});

// Add a new user
export const addUser = createAsyncThunk('users/add', async userData => {
  const data = await addUserAPI(userData);
  return {
    id: data.id ?? Math.floor(Math.random() * 100000),
    name: data.name?.name || data.name,
    class: data.class?.class || data.class,
    createdAt: data.createdAt ?? new Date().toISOString(),
  };
});

// Update an existing user
export const upuser = createAsyncThunk('users/update', async userData => {
  const data = await updateUserAPI(userData);
  return data;
});

// Delete a user
export const deleteUserAsync = createAsyncThunk('users/delete', async id => {
  await deleteUserAPI(id);
  return id;
});

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    updateUser: (state, action) => {
      const idx = state.list.findIndex(u => u.id === action.payload.id);
      if (idx !== -1) {
        state.list[idx] = {
          ...state.list[idx],
          ...action.payload,
        };
      }
    },
    replaceAll: (state, action) => {
      state.list = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      // Load users
      .addCase(loadUsers.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loadUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(loadUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error?.message ?? 'Failed to load';
      })

      // Add user
      .addCase(addUser.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list.push(action.payload);
      })
      .addCase(addUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error?.message ?? 'Failed to add';
      })

      // Update user
      .addCase(upuser.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(upuser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const idx = state.list.findIndex(u => u.id === action.payload.id);
        if (idx !== -1) {
          state.list[idx] = { ...state.list[idx], ...action.payload };
        }
      })
      .addCase(upuser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error?.message ?? 'Failed to update';
      })

      // Delete user
      .addCase(deleteUserAsync.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deleteUserAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = state.list.filter(u => u.id !== action.payload);
      })
      .addCase(deleteUserAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error?.message ?? 'Failed to delete';
      });
  },
});

export const { updateUser, replaceAll } = usersSlice.actions;
export default usersSlice.reducer;
