import { Group, Paper, Stack, TextInput, Title, Button, Text, Select, LoadingOverlay } from '@mantine/core'

import useOrganizationsInformation from './useOrganizationsInformation'
import { usePermission } from 'hooks'
import { useParams } from 'react-router-dom'
import { RenderIf } from 'utilities'


const OrganizationsInformation = () => {
  const { id: organizationId } = useParams()
  const {
    isSuccess, isLoading, nameForm, typeForm, orgTypes,
    handleUpdateOrganizationName,
    handleUpdateOrganizationType,
    handleDeleteOrganization
  } = useOrganizationsInformation()
  const { hasAccessToOrganizationAsOwner } = usePermission({ organizationId: parseInt(organizationId) })

  if (isLoading) {
    return <LoadingOverlay visible />
  }

  return isSuccess && <Stack spacing="lg">
    <Title order={4}>Organization Information</Title>
    <Paper p="md" withBorder>
      <form onSubmit={nameForm.onSubmit(handleUpdateOrganizationName)}>
        <Stack spacing="md">
          <TextInput label="Organization Name" disabled={!hasAccessToOrganizationAsOwner(organizationId)} {...nameForm.getInputProps('name')} />
          <Group position="right">
            <RenderIf isTrue={hasAccessToOrganizationAsOwner(organizationId)}>
              <Button type="submit" variant="subtle">Change Name</Button>
            </RenderIf>
          </Group>
        </Stack>
      </form>
    </Paper>
    <Paper p="md" withBorder>
      <form onSubmit={typeForm.onSubmit(handleUpdateOrganizationType)}>
        <Stack spacing="md">
          <Select data={orgTypes} {...typeForm.getInputProps('org_type')} label="Organization Type" disabled={!hasAccessToOrganizationAsOwner(organizationId)} />
          <Group position="right">
            <RenderIf isTrue={hasAccessToOrganizationAsOwner(organizationId)}>

              <Button type="submit" variant="subtle">Change Type</Button>
            </RenderIf>
          </Group>
        </Stack>
      </form>
    </Paper>
    <RenderIf isTrue={hasAccessToOrganizationAsOwner(organizationId)}>

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
    </RenderIf>
  </Stack>

}
export default OrganizationsInformation