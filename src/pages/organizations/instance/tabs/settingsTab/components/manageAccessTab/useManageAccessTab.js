import { useDeleteOrganizationUserInvitationMutation, useEditOrganizationInvitationMutation, useGetOrganizationUserAndInvitesQuery, useResendUserInvitationMutation, useSendOrganizationInvitationsMutation, useSetOrganizationUserRoleMutation } from 'redux/reducer/organizations/organizationsApiSlice'
import { useSelector, useDispatch } from 'react-redux'
import { selectInvitations, setDeleteInvitationModalOpenId, setDeleteUserRoleModalOpenId, setInvitationLoading, unsetInvitationLoading } from 'redux/reducer/ManageAccessSlice'
import { showNotification } from '@mantine/notifications'
import { emptyInvitations, closeUserInviteModal } from 'redux/reducer/ManageAccessSlice'
import { useParams } from 'react-router-dom'
import { usePermission } from 'hooks'

const useManageAccessTab = () => {
  const { id: organizationId } = useParams()

  const { data: rolesAndInvites, isSuccess, isLoading } = useGetOrganizationUserAndInvitesQuery(organizationId)
  const [deleteOrganizationUserInvitation] = useDeleteOrganizationUserInvitationMutation()
  const [resendUserInvitation] = useResendUserInvitationMutation()
  const [editInvitation] = useEditOrganizationInvitationMutation()
  const [setUserRole] = useSetOrganizationUserRoleMutation()
  const { getAvailableRolesForOrganization } = usePermission({ organizationId: organizationId })

  const invitations = useSelector(selectInvitations)
  const [sendInvitation] = useSendOrganizationInvitationsMutation()
  const dispatch = useDispatch()

  const handleDeleteUserRole = async (id) => {
    await setUserRole({
      organizationId: organizationId,
      params: {
        user_id: id,
        roles: []
      }
    }).unwrap()
      .then(res => {
        showNotification({
          title: 'User removed from organization',
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
      organizationId: organizationId,
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
      organizationId: organizationId,
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
    await sendInvitation({ id: organizationId, userRoles: invitations }).unwrap()
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
      organizationId: organizationId,
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
      organizationId: organizationId,
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
      organizationId: organizationId,
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
    isSuccess, isLoading, rolesAndInvites,
    handleResendInvitation,
    getAvailableRolesForOrganization,
    handleDeleteInvitation,
    handleDeleteUserRole,
    handleSendInvitation,
    handleEditInvitation,
    handleSetUserRole,
    handleSetInvitationRole
  }
}
export default useManageAccessTab
