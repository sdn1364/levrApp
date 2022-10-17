import { Group, Text, Badge, ActionIcon, Center, Stack } from '@mantine/core'
import { CheckPermission, UserAvatar } from 'components'
import RoleSelect from './RoleSelect'
import { READABLE_ROLE_MAPPING } from 'roles'
import { IconTrash } from '@tabler/icons'
import useManageAccess from 'components/ManageAccess/useManageAccess'


const RolesRow = ({ user, availableRole, setUserRole }) => {

  const { handleClickDeleteUserRole } = useManageAccess()


  return <tr>
    <td>
      <Group spacing="sm">
        <UserAvatar size={40} userId={user.user_id} radius={40} />
        <Stack spacing={1}>
          <Text size="sm" weight={500}>
            {user.user_full_name}
          </Text>
          <Text size="xs" color="dimmed">
            {user.user_email}
          </Text>
        </Stack>
      </Group>
    </td>

    <td>
      <Center>
        {
          availableRole.includes(user.roles[0])
            ? <RoleSelect value={user.roles} availableRole={availableRole} onSave={(value) => setUserRole({ user_id: user.user_id, roles: [value] })} />
            : <Text>{READABLE_ROLE_MAPPING[user.roles[0]]}</Text>
        }
      </Center>
    </td>
    <td><Badge fullWidth color="green">Accepted</Badge></td>
    <td>
      <CheckPermission ifUserCan="delete user role" module={module}>
        <ActionIcon variant="subtle" onClick={() => handleClickDeleteUserRole(user.user_id)}><IconTrash size={16} /></ActionIcon>
      </CheckPermission>
    </td>
  </tr>
}
export default RolesRow
