import { useSendOrganizationInvitationsMutation } from 'redux/reducer/organizations/organizationsApiSlice'
import { useSelector, useDispatch } from 'react-redux'
import { selectInvitations, setInvitationLoading, unsetInvitationLoading } from 'redux/reducer/ManageAccessSlice'
import { showNotification } from '@mantine/notifications'
import { emptyInvitations, closeUserInviteModal } from 'redux/reducer/ManageAccessSlice'

const useManageAccessTab = (organizationId) => {

  const invitations = useSelector(selectInvitations)
  const [sendInvitation] = useSendOrganizationInvitationsMutation()
  const dispatch = useDispatch()

  const handleDeleteUserRole = (id) => {
    console.log('handel delete user role hit in manage access tab: ', id)
  }
  const handleDeleteInvitation = (id) => {
    console.log('handle delete invitation hit in manage access tab:', id)
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
  return { handleDeleteInvitation, handleDeleteUserRole, handleSendInvitation, handleEditInvitation }
}
export default useManageAccessTab
