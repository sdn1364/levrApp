import {createSlice} from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState:{
    token: null,
    email: null
  },
  reducers:{
    setCredentials: (state,action)=>{
      const {key} = action.payload
      state.token = key
    },
    logOut: (state, action)=>{
      state.token = null;
    },

  }
})

export const { setCredentials , logOut,} = authSlice.actions
export default authSlice.reducer

export const selectCurrentToken = (state) => state.auth.token
