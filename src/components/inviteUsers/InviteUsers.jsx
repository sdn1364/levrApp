import { ActionIcon, Button, Group, Paper, Select, Stack, Text, TextInput } from '@mantine/core'
import { IconPlus, IconTrash } from '@tabler/icons'
import { useSelector } from 'react-redux'
import { selectInvitations } from 'redux/reducer/ManageAccessSlice'
import useInviteUsers from './useInviteUsers'

const InviteUsers = ({ availableRoles }) => {

  const invitations = useSelector(selectInvitations)


  const { form, roles, deleteInvitation, addEmailToList, changeRole } = useInviteUsers(availableRoles)

  return (
    <>
      <form onSubmit={form.onSubmit(addEmailToList)}>
        <TextInput label="Email" withAsterisk placeholder="Email to invite" rightSectionWidth={80}
                   {...form.getInputProps('email')}
                   rightSection={<Button type="submit" compact variant="subtle" size="xs" leftIcon={<IconPlus size={14} />}>Add</Button>}
        />
      </form>

      {invitations && (
        <Stack spacing="sm" mt="lg">
          {invitations.map((invite, index) => (
            <Paper key={index} withBorder p={'xs'}>
              <Group position="apart">
                <Text size="xs">{invite.email}</Text>
                <Group>
                  <Select size="xs" defaultValue={invite.role} placeholder="Select" onChange={(value) => changeRole({ role: value, email: invite.email })} data={roles} variant="subtle" />
                  <ActionIcon variant="subtle" onClick={() => deleteInvitation(invite)}><IconTrash size={14} /></ActionIcon>
                </Group>
              </Group>
            </Paper>
          ))}
        </Stack>
      )
      }
    </>
  )
}

export default InviteUsers
