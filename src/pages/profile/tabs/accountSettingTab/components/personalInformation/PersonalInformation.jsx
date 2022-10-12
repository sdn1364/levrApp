import { Button, Group, LoadingOverlay, Paper, Stack, Text, TextInput, Title } from '@mantine/core'
import AvatarUpload from '../avtarUpload/AvatarUpload'
import usePersonalInformation from './usePersonalInformation'

const PersonalInformation = () => {


  const { handleUpdateName, user, isSuccess, isLoading, form } = usePersonalInformation()

  if (isLoading) {
    return <LoadingOverlay visible />
  }

  return isSuccess && <Stack spacing="xs">
    <Title order={5}>Profile Information</Title>
    <Text size="xs" variant="dimmed">Update your photo and personal details here</Text>
    <Paper p="md" withBorder>
      <AvatarUpload userId={user.id} />
    </Paper>
    <Paper p="md" withBorder>
      <form onSubmit={form.onSubmit(handleUpdateName)}>
        <Stack>
          <TextInput
            label="Full Name"
            {...form.getInputProps('fullName')}
          />
          <Group position="right">
            <Button variant="subtle" type="submit">Update Full name</Button>
          </Group>
        </Stack>
      </form>
    </Paper>
  </Stack>

}
export default PersonalInformation