import { useParams } from 'react-router-dom'
import { useDeleteLoanAppUserInvitationMutation, useEditLoanAppInvitationMutation, useGetLoanAppUsersAndInvitesQuery, useResendLoanAppUserInvitationMutation, useSendLoanAppInvitationsMutation, useSetLoanAppUserRoleMutation } from 'redux/reducer/loanApplication/loanApplicationApiSlice'
import { usePermission } from 'hooks'
import { useDispatch, useSelector } from 'react-redux'
import { closeUserInviteModal, emptyInvitations, selectInvitations, setDeleteInvitationModalOpenId, setDeleteUserRoleModalOpenId, setInvitationLoading, unsetInvitationLoading } from 'redux/reducer/ManageAccessSlice'
import { showNotification } from '@mantine/notifications'

const useManageAccessTab = () => {
  const { id: loanAppId } = useParams()
  const { data: rolesAndInvite, isSuccess, isLoading } = useGetLoanAppUsersAndInvitesQuery(loanAppId)
  const { getAvailableRolesForLoanApplication } = usePermission({ loanAppId })

  const [deleteOrganizationUserInvitation] = useDeleteLoanAppUserInvitationMutation()
  const [resendUserInvitation] = useResendLoanAppUserInvitationMutation()
  const [editInvitation] = useEditLoanAppInvitationMutation()
  const [setUserRole] = useSetLoanAppUserRoleMutation()

  const invitations = useSelector(selectInvitations)
  const [sendInvitation] = useSendLoanAppInvitationsMutation()

  const dispatch = useDispatch()

  const handleDeleteUserRole = async (id) => {
    await setUserRole({
      loanAppId: loanAppId,
      params: {
        user_id: id,
        roles: []
      }
    }).unwrap()
      .then(res => {
        showNotification({
          title: 'User removed from loan application',
          color: 'blue'
        })
        dispatch(setDeleteUserRoleModalOpenId(null))
      }).catch(err => {
        showNotification({
          title: 'Something went wrong',
          color: 'red'
        })
      })
  }

  const handleDeleteInvitation = async (id) => {
    await deleteOrganizationUserInvitation({
      loanAppId: loanAppId,
      invitationId: id
    }).unwrap()
      .then(res => {
        showNotification({
          title: 'Invitation deleted',
          color: 'blue'
        })
        dispatch(setDeleteInvitationModalOpenId(null))
      })
      .catch(err => {
        showNotification({
          title: 'Something went wrong',
          message: 'Please try again',
          color: 'red'
        })
      })
  }

  const handleResendInvitation = async (id) => {
    await resendUserInvitation({
      loanAppId: loanAppId,
      invitationId: id
    }).unwrap()
      .then(res => {
        showNotification({
          title: 'Invitation sent again',
          color: 'green'
        })
      }).catch(err => {
        showNotification({
          title: 'Something went wrong',
          color: 'red'
        })
      })
  }

  const handleSendInvitation = async () => {
    dispatch(setInvitationLoading())
    await sendInvitation({ id: loanAppId, userRoles: invitations }).unwrap()
      .then(res => {
        showNotification({
          title: 'Invitations Sent',
          color: 'green'
        })
        dispatch(emptyInvitations())
        dispatch(closeUserInviteModal())
        dispatch(unsetInvitationLoading())
      }).catch(error => {
        console.log(error)
        error.data.user_roles.forEach(err => {
          showNotification({
              title: 'Error sending invitations',
              message: err.email,
              color: 'red'
            }
          )
        })
      })
  }

  const handleEditInvitation = async (values) => {
    await editInvitation({
      loanAppId: loanAppId,
      params: values
    }).unwrap()
      .then(res => {
        showNotification({
          title: 'Invitation edited',
          color: 'green'
        })
      }).catch(err => {
        showNotification({
          title: 'Something went wrong',
          color: 'red'
        })
      })
  }

  const handleSetUserRole = async (values) => {
    await setUserRole({
      loanAppId: loanAppId,
      params: values
    }).unwrap()
      .then(res => {
        showNotification({
          title: 'User\'s role has changed',
          color: 'green'
        })
      }).catch(err => {
        showNotification({
          title: 'Something went wrong',
          color: 'red'
        })
      })
  }

  const handleSetInvitationRole = async (values) => {
    await editInvitation({
      loanAppId: loanAppId,
      params: values
    }).unwrap()
      .then(res => {
        showNotification({
          title: 'Invitation role changed',
          color: 'green'
        })
      }).catch(err => {
        showNotification({
          title: 'Something went wrong',
          color: 'red'
        })
      })
  }

  return {
    rolesAndInvite,
    isSuccess, isLoading,
    getAvailableRolesForLoanApplication,
    handleDeleteInvitation,
    handleDeleteUserRole,
    handleSendInvitation,
    handleEditInvitation,
    handleResendInvitation,
    handleSetUserRole,
    handleSetInvitationRole
  }
}
export default useManageAccessTab
