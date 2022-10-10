import { ActionIcon, Text, Stack, Button, Center } from '@mantine/core'
import { IconSend, IconTrash } from '@tabler/icons'

import RoleSelect from './RoleSelect'
import { READABLE_ROLE_MAPPING } from 'roles'
import { EditableTextInput, TimeAgo } from 'components'
import useManageAccess from '../useManageAccess'

const InvitationRow = ({ invite, availableRole, editInvitation, resendInvitation, setInvitationRole }) => {

  const { handleClickDeleteInvitation } = useManageAccess()

  return <tr>
    <td>
      <EditableTextInput save={(value) => editInvitation({
        to_email: value,
        invitation_id: invite.id,
        roles: invite.object_permissions
      })} defaultValue={invite.to_email} />
    </td>
    <td>
      {
        availableRole.includes(invite.object_permissions[0])
          ? <RoleSelect value={invite.object_permissions} availableRole={availableRole}
                        onSave={(value) => setInvitationRole({ to_email: invite.to_email, invitation_id: invite.id, roles: [value] })} />
          : <Text>{READABLE_ROLE_MAPPING[invite.object_permissions[0]]}</Text>
      }
    </td>
    <td>
      <Stack spacing="xs">
        <Center>
          <TimeAgo timestamp={invite.sent_time} />
        </Center>
        <Button variant="default" size="xs" compact onClick={() => resendInvitation(invite.id)} leftIcon={<IconSend size={14} />}>Resend Invitation</Button>
      </Stack>
    </td>
    <td>
      <ActionIcon variant="subtle" onClick={() => handleClickDeleteInvitation(invite.id)}><IconTrash size={16} /></ActionIcon>
    </td>
  </tr>
}
export default InvitationRow
