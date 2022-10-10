import { Button, Group, Modal, Stack, Text, Title } from '@mantine/core'
import { selectDeleteInvitationModalOpenId } from 'redux/reducer/ManageAccessSlice'
import { useSelector } from 'react-redux'
import useManageAccess from '../useManageAccess'
import { ConfirmModal } from 'components'

const ConfirmDeleteInvitationModal = ({ rolesAndInvites, deleteInvitation }) => {

  const { handleCloseDeleteInvitationModal } = useManageAccess()

  const deleteInviteModalOpenId = useSelector(selectDeleteInvitationModalOpenId)

  const deleteModalInvite = rolesAndInvites.invitations.filter(
    (invt) => invt.id === deleteInviteModalOpenId
  )[0]

  return <ConfirmModal
    centered
    isDanger
    opened={deleteInviteModalOpenId !== null}
    onClose={handleCloseDeleteInvitationModal}
    submitLabel="Delete"
    onSubmit={() => deleteInvitation(deleteModalInvite?.id)}
    title="Your are about to delete an invitation!"
  >
    <Stack>
      <Text align="center" size="sm">
        Are you sure you want to delete Invitation for:
      </Text>
      <Text weight={500} align="center">{deleteModalInvite && deleteModalInvite.to_email}</Text>
    </Stack>
  </ConfirmModal>
}
export default ConfirmDeleteInvitationModal