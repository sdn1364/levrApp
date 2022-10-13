import { Button, Group, Paper, PasswordInput, Stack, Text, TextInput, Title } from '@mantine/core'
import useEmailSettings from './useEmailSettings'

const EmailSettings = () => {

  const { isSuccess, handleUpdateUserEmail, form } = useEmailSettings()

  return isSuccess && <Stack spacing="xs">
    <Title order={5}>Email Settings</Title>
    <Text size="xs" variant="dimmed">Update your email address here</Text>
    <Paper p="md" withBorder>
      <form onSubmit={form.onSubmit(handleUpdateUserEmail)}>
        <Stack>
          <TextInput
            label="Email address"
            {...form.getInputProps('email')}
          />
          <PasswordInput
            label="Confirm Password"
            {...form.getInputProps('password')}
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