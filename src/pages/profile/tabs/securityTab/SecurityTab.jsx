import { Stack, Title, Text, Paper, Group, Button, Modal, PasswordInput } from '@mantine/core'
import { useState } from 'react'

const SecurityTab = () => {

  const [opened, setOpened] = useState(false)
  return <Stack spacing="xs">
    <Title order={5}>Security Settings</Title>
    <Text size="xs" variant="dimmed">Change your password here</Text>
    <Paper p="md" withBorder>
      <Group position="apart">
        <Title order={5}>Password</Title>
        <Button onClick={() => setOpened(true)}>Reset Password</Button>
      </Group>
    </Paper>
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title="Reset Password"
    >
      <form action="pages/profile/tabs/securityTab/SecurityTab">
        <Stack spacing="md">
          <PasswordInput
            label="Enter old password"
            name="password"
          />
          <PasswordInput
            label="New password"
            name=""
          />
          <PasswordInput
            label="Confirm New Password"
            name=""
          />
        </Stack>
        <Group position="apart" sx={{ marginTop: 30 }}>
          <Button variant="transparent" onClick={() => setOpened(false)}>Cancel</Button>
          <Button type="submit" variant="primary">Reset Password</Button>
        </Group>
      </form>
    </Modal>
  </Stack>
}
export default SecurityTab
