import { useDispatch } from 'react-redux'
import {
  closeUserInviteModal, openUserInviteModal,
  setDeleteInvitationModalOpenId,
  setDeleteUserRoleModalOpenId
} from 'redux/reducer/ManageAccessSlice'

const useManageAccess = () => {


  const dispatch = useDispatch()

  // Delete user invitation functions
  const handleClickDeleteInvitation = (invitationId) => {
    dispatch(setDeleteInvitationModalOpenId(invitationId))
  }
  const handleCloseDeleteInvitationModal = () => {
    dispatch(setDeleteInvitationModalOpenId(null))
  }

  // Delete user role functions
  const handleClickDeleteUserRole = (userId) => {
    dispatch(setDeleteUserRoleModalOpenId(userId))
  }
  const handleCloseDeleteUserRoleModal = () => {
    dispatch(setDeleteUserRoleModalOpenId(null))
  }

  const handleCloseUserInviteModal = () => {
    dispatch(closeUserInviteModal())
  }
  const handleOpenUserInviteModal = () => {
    dispatch(openUserInviteModal())
  }

  return {
    // user role delete functions and states
    handleClickDeleteInvitation,
    handleCloseDeleteInvitationModal,
    handleClickDeleteUserRole,
    handleCloseDeleteUserRoleModal,
    handleCloseUserInviteModal,
    handleOpenUserInviteModal
  }
}

export default useManageAccess
