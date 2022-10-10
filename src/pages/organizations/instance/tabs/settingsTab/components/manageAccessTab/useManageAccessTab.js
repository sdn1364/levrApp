import { useDeleteOrganizationUserInvitationMutation, useGetOrganizationUserAndInvitesQuery, useSendOrganizationInvitationsMutation } from 'redux/reducer/organizations/organizationsApiSlice'
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

  const { getAvailableRolesForOrganization } = usePermission({ organizationId: organizationId })

  const invitations = useSelector(selectInvitations)
  const [sendInvitation] = useSendOrganizationInvitationsMutation()
  const dispatch = useDispatch()

  const handleDeleteUserRole = (id) => {
    console.log('handel delete user role hit in manage access tab: ', id)
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

  const handleResendInvitation = (id) => {
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

  const handleEditInvitation = (values) => {
    console.log(values)
  }

  return {
    isSuccess, isLoading, rolesAndInvites,
    handleResendInvitation,
    getAvailableRolesForOrganization,
    handleDeleteInvitation,
    handleDeleteUserRole,
    handleSendInvitation,
    handleEditInvitation
  }
}
export default useManageAccessTab
