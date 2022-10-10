import { Button, Group, Modal, LoadingOverlay } from '@mantine/core'
import { selectInvitations, selectInvitationsLoading, selectUserInviteModalOpened } from 'redux/reducer/ManageAccessSlice'
import useManageAccess from '../useManageAccess'
import { useSelector } from 'react-redux'
import { InviteUsers } from 'components'

const UserInviteModal = ({ availableRoles, sendInvitation }) => {

  const opened = useSelector(selectUserInviteModalOpened)
  const invitationsLoading = useSelector(selectInvitationsLoading)
  const invitations = useSelector(selectInvitations)
  const { handleCloseUserInviteModal } = useManageAccess()

  return <Modal opened={opened}
                centered
                size="md"
                onClose={handleCloseUserInviteModal}
                title="Invite Collaborators"
  >
    <LoadingOverlay visible={invitationsLoading} overlayBlur={2} />

    <InviteUsers availableRoles={availableRoles} />
    <Group position="apart" mt="lg">
      <Button onClick={handleCloseUserInviteModal} variant="subtle">Cancel</Button>
      <Button disabled={invitations.length === 0} onClick={sendInvitation}>Send Invitation</Button>
    </Group>
  </Modal>
}

export default UserInviteModal
