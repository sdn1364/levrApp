import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  open: false
}

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers:{
    toggleSidebar: (state)=>{
      state.open = !state.open;
    }
  }
})

export const  sidebarStat = (state) => state.sidebar.open

export const {toggleSidebar} = sidebarSlice.actions;
export default sidebarSlice.reducer