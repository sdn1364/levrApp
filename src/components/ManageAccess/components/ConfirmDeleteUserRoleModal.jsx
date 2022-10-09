import {Button, Group, Modal, Stack, Title, Text} from "@mantine/core";
import useManageAccess from "../useManageAccess";
import {useSelector} from "react-redux";
import {selectDeleteUserRoleModalOpenId} from 'redux/reducer/ManageAccessSlice';

const ConfirmDeleteUserRoleModal = ({rolesAndInvites, deleteUserRole}) => {

  const {handleCloseDeleteUserRoleModal} = useManageAccess();

  const deleteUserRoleModalOpenId = useSelector(selectDeleteUserRoleModalOpenId);

  const deleteModalUser = rolesAndInvites.user_roles.filter(
    (role) => role.user_id === deleteUserRoleModalOpenId
  )[0];


  return <Modal
    centered
    opened={deleteUserRoleModalOpenId !== null}
    onClose={handleCloseDeleteUserRoleModal}

    title={<Title order={5} color='red.5'>Are you sure you want to delete this User Role?</Title>}
  >
    <Stack spacing="xl">
      <Stack>
        <Text align="center" size="sm">
          You are about to delete User role for
        </Text>
        <Text weight={500} align="center">{deleteModalUser && deleteModalUser.user_email}</Text>
      </Stack>
      <Group position="apart">
        <Button onClick={handleCloseDeleteUserRoleModal} variant='subtle'>Cancel</Button>
        <Button color="red" onClick={() => deleteUserRole(deleteModalUser?.user_id)}>Delete</Button>
      </Group>
    </Stack>
  </Modal>
}
export default ConfirmDeleteUserRoleModal;
