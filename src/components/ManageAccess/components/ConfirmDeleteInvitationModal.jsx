import {Button, Group, Modal, Stack, Text, Title} from "@mantine/core";
import {selectDeleteInvitationModalOpenId} from "redux/reducer/ManageAccessSlice";
import {useSelector} from "react-redux";
import useManageAccess from "../useManageAccess";

const ConfirmDeleteInvitationModal = ({rolesAndInvites, deleteInvitation})=>{

  const {handleCloseDeleteInvitationModal} = useManageAccess();

  const deleteInviteModalOpenId = useSelector(selectDeleteInvitationModalOpenId);

  const deleteModalInvite = rolesAndInvites.invitations.filter(
    (invt) => invt.id === deleteInviteModalOpenId
  )[0];

  return <Modal
    centered
    opened={deleteInviteModalOpenId !== null}
    onClose={handleCloseDeleteInvitationModal}
    title={<Title order={5} color='red.5'>Are you sure you want to delete this Invitation?</Title>}

  >
    <Stack spacing="xl">
      <Stack>

        <Text align="center" size="sm">
          You are about to delete User role for
        </Text>
        <Text weight={500} align="center">{deleteModalInvite && deleteModalInvite.to_email}</Text>
      </Stack>
      <Group position="apart">
        <Button onClick={handleCloseDeleteInvitationModal} variant='subtle'>Cancel</Button>
        <Button color="red" onClick={()=>deleteInvitation(deleteModalInvite?.id)}>Delete</Button>
      </Group>
    </Stack>
  </Modal>


}
export default ConfirmDeleteInvitationModal;