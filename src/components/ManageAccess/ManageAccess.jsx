import { Paper, Title, Button, Stack, Group, Text } from '@mantine/core'

import RolesRow from './components/RolesRow'
import RolesAndInvitesTable from './components/RolesAndInvitesTable'
import ConfirmDeleteUserRoleModal from './components/ConfirmDeleteUserRoleModal'
import InvitationRow from './components/InvitationRow'
import ConfirmDeleteInvitationModal from './components/ConfirmDeleteInvitationModal'
import { IconPlus } from '@tabler/icons'
import useManageAccess from './useManageAccess'
import UserInviteModal from './components/UserInviteModal'


const ManageAccess = ({
                        rolesAndInvites,
                        availableRoles,
                        title,
                        handleEditInvitation,
                        handleDeleteInvitation,
                        handleDeleteUserRole,
                        sendInvitation
                      }) => {

  const renderRoles = () => {
    return rolesAndInvites.user_roles.map((user) => (
      <RolesRow availableRole={availableRoles} key={user.user_id} user={user} />
    ))
  }

  const renderInvitations = () => {
    return <>
      <tr>
        <td colSpan={4}>
          <Text size="xs" weight={500} color="dimmed" align="center">Pending Invitations</Text>
        </td>
      </tr>
      {
        rolesAndInvites.invitations.map((invite) => (
          <InvitationRow key={invite.id} invite={invite} availableRole={availableRoles} handleEditInvitation={handleEditInvitation} />
        ))
      }
      <tr>
        <td colSpan={4}>
          <Text size="xs" weight={500} color="dimmed" align="center">Accepted Invitations</Text>
        </td>
      </tr>
    </>
  }

  const { handleOpenUserInviteModal } = useManageAccess()


  return (
    <>
      <ConfirmDeleteUserRoleModal rolesAndInvites={rolesAndInvites} deleteUserRole={handleDeleteUserRole} />
      <ConfirmDeleteInvitationModal rolesAndInvites={rolesAndInvites} deleteInvitation={handleDeleteInvitation} />
      <UserInviteModal availableRoles={availableRoles} sendInvitation={sendInvitation} />
      <Stack spacing="lg">
        <Group position="apart">
          <Title order={4}>{title}</Title>
          <Button size="xs" leftIcon={<IconPlus size={14} />} onClick={handleOpenUserInviteModal}>Invite Users</Button>
        </Group>
        <Paper p="xs" withBorder>

          <RolesAndInvitesTable>
            {/* if invitations were available render this*/}
            {rolesAndInvites.invitations.length > 0 && renderInvitations()}

            {/* if roles were available render this*/}
            {renderRoles()}
          </RolesAndInvitesTable>

        </Paper>
      </Stack>

    </>
  )

}
export default ManageAccess

