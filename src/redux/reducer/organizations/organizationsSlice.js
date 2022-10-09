import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  newOrganizationModal : false
}

const organizationsSlice = createSlice({
  name: 'organization',
  initialState,
  reducers : {
    setOpenNewOrganizationModal : (state) =>{
      state.newOrganizationModal = true
    },
    setCloseNewOrganizationModal: (state)=>{
      state.newOrganizationModal = false
    }
  }
})

export const selectNewOrganizationModal = (state)=> state.organization.newOrganizationModal

export const {
  setOpenNewOrganizationModal,
  setCloseNewOrganizationModal
} = organizationsSlice.actions

export default organizationsSlice.reducer