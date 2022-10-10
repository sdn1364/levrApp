import { Stack, Text } from '@mantine/core'
import useManageAccess from '../useManageAccess'
import { useSelector } from 'react-redux'
import { selectDeleteUserRoleModalOpenId } from 'redux/reducer/ManageAccessSlice'
import { ConfirmModal } from '../../index'

const ConfirmDeleteUserRoleModal = ({ rolesAndInvites, deleteUserRole }) => {

  const { handleCloseDeleteUserRoleModal } = useManageAccess()

  const deleteUserRoleModalOpenId = useSelector(selectDeleteUserRoleModalOpenId)

  const deleteModalUser = rolesAndInvites.user_roles.filter(
    (role) => role.user_id === deleteUserRoleModalOpenId
  )[0]


  return <ConfirmModal
    centered
    isDanger
    opened={deleteUserRoleModalOpenId !== null}
    onClose={handleCloseDeleteUserRoleModal}
    submitLabel="Delete"
    onSubmit={() => deleteUserRole(deleteModalUser?.user_id)}
    title="You are about to delete a user role!"
  >
    <Stack spacing="sm">
      <Text align="center" size="sm">
        Are you sure you want to delete User role for:
      </Text>
      <Text weight={500} align="center">{deleteModalUser && deleteModalUser.user_email}</Text>
    </Stack>

  </ConfirmModal>
}
export default ConfirmDeleteUserRoleModal

