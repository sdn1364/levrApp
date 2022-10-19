import { ActionIcon, Group, Paper, Text, Tooltip, useMantineTheme } from '@mantine/core'
import { UserAvatar } from 'components'
import { IconReload } from '@tabler/icons'
import { useGetUserByIdQuery } from 'redux/reducer/auth/authApiSlice'
import { useSearchParams } from 'react-router-dom'

const SelectedUser = ({ userId }) => {
  const theme = useMantineTheme()
  const [searchParams] = useSearchParams()
  const selectedChannelId = parseInt(
    searchParams.get('selectedChannelId')
  )
  const selectedUserId = parseInt(
    searchParams.get('selectedUserId')
  )
  console.log(selectedChannelId)
  console.log(selectedUserId)
  const { data: selectedUser, isSuccess } = useGetUserByIdQuery(3)

  return isSuccess && <Paper p="sm" sx={{ background: theme.colorScheme === 'light' ? theme.colors['gray'][0] : theme.colors['gray'][9] }}>
    <Group position="apart">
      <Group>
        <UserAvatar userId={userId} color="blue" size={30}>{selectedUser.email}</UserAvatar>
        <Text size="sm">{selectedUser.full_name || selectedUser.email}</Text>
      </Group>
      <Tooltip label="Click to load older messages">
        <ActionIcon color="purple"><IconReload size={16} /></ActionIcon>
      </Tooltip>
    </Group>
  </Paper>
}

export default SelectedUser
