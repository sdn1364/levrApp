import { Group, Paper, Stack, TextInput, Title, Button, Text, Select, LoadingOverlay } from '@mantine/core'

import useOrganizationsInformation from './useOrganizationsInformation'


const OrganizationsInformation = () => {

  const {
    isSuccess, isLoading, nameForm, typeForm, orgTypes,
    handleUpdateOrganizationName,
    handleUpdateOrganizationType,
    handleDeleteOrganization
  } = useOrganizationsInformation()

  if (isLoading) {
    return <LoadingOverlay visible />
  }

  return isSuccess && <Stack spacing="lg">
    <Title order={4}>Organization Information</Title>
    <Paper p="md" withBorder>
      <form onSubmit={nameForm.onSubmit(handleUpdateOrganizationName)}>
        <Stack spacing="md">
          <TextInput label="Organization Name" {...nameForm.getInputProps('name')} />
          <Group position="right">
            <Button type="submit" variant="subtle">Change Name</Button>
          </Group>
        </Stack>
      </form>
    </Paper>
    <Paper p="md" withBorder>
      <form onSubmit={typeForm.onSubmit(handleUpdateOrganizationType)}>
        <Stack spacing="md">
          <Select data={orgTypes} {...typeForm.getInputProps('org_type')} label="Organization Type" />
          <Group position="right">
            <Button type="submit" variant="subtle">Change Type</Button>
          </Group>
        </Stack>
      </form>
    </Paper>
    <Title order={5} color="red.5">Danger zone</Title>
    <Paper p="md" withBorder>
      <form onSubmit={typeForm.onSubmit(handleUpdateOrganizationType)}>
        <Stack spacing="md">
          <Text>
            Once you delete your account, there is no going back. Please be certain.
          </Text>
          <Group position="left">
            <Button type="submit" variant="outline" color="red.5" onClick={handleDeleteOrganization}>Delete Organization</Button>
          </Group>
        </Stack>
      </form>
    </Paper>
  </Stack>

}
export default OrganizationsInformation