import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  deleteUserRoleModalOpenId: null,
  deleteInvitationModalOpenId: null,
  userInviteModalOpened: false,
  invitations: [],
  sendInvitationLoading: false
}

const manageAccessSlice = createSlice({
  name: 'manageAccess',
  initialState,
  reducers: {
    setDeleteUserRoleModalOpenId: (state, action) => {
      state.deleteUserRoleModalOpenId = action.payload
    },
    setDeleteInvitationModalOpenId: (state, action) => {
      state.deleteInvitationModalOpenId = action.payload
    },
    openUserInviteModal: (state) => {
      state.userInviteModalOpened = true
    },
    closeUserInviteModal: (state) => {
      state.userInviteModalOpened = false

    },
    setInvitations: (state, action) => {
      state.invitations.push(action.payload)
    },
    removeInvitations: (state, action) => {
      const newInvitations = state.invitations.filter(invite =>
        invite.email !== action.payload.email
      )
      state.invitations = newInvitations
    },
    emptyInvitations: (state) => {
      state.invitations = []
    },
    setInvitationLoading: (state) => {
      state.sendInvitationLoading = true
    },
    unsetInvitationLoading: (state) => {
      state.sendInvitationLoading = false
    }

  }
})

export const selectDeleteUserRoleModalOpenId = (state) => state.manageAccess.deleteUserRoleModalOpenId
export const selectDeleteInvitationModalOpenId = (state) => state.manageAccess.deleteInvitationModalOpenId
export const selectUserInviteModalOpened = (state) => state.manageAccess.userInviteModalOpened
export const selectInvitations = (state) => state.manageAccess.invitations
export const selectInvitationsLoading = (state) => state.manageAccess.sendInvitationLoading

export const {
  setDeleteUserRoleModalOpenId,
  setDeleteInvitationModalOpenId,
  closeUserInviteModal,
  openUserInviteModal,
  setInvitations,
  removeInvitations,
  emptyInvitations,
  unsetInvitationLoading,
  setInvitationLoading
} = manageAccessSlice.actions
export default manageAccessSlice.reducer
