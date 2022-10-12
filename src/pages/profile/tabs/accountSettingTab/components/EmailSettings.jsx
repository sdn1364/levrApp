import { Button, Group, Paper, PasswordInput, Stack, Text, TextInput, Title } from '@mantine/core'
import { useGetUserQuery } from 'redux/reducer/auth/authApiSlice'

const EmailSettings = () => {

  const { data: user, isSuccess } = useGetUserQuery()

  return isSuccess && <Stack spacing="xs">
    <Title order={5}>Email Settings</Title>
    <Text size="xs" variant="dimmed">Update your email address here</Text>
    <Paper p="md" withBorder>
      <form action="pages/profile/tabs/accountSettingTab/components/EmailSettings">
        <Stack>
          <TextInput
            label="Email address"
            defaultValue={user.email}
            name="email"
          />
          <PasswordInput
            label="Confirm Password"
            name="password"
          />
          <Group position="right">
            <Button type="submit" variant="subtle">Update Email</Button>
          </Group>
        </Stack>
      </form>
    </Paper>
  </Stack>
}
export default EmailSettings