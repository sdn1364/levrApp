import { Group, Paper, Stack, TextInput, Title, Button, Text, Select, LoadingOverlay } from '@mantine/core'

import useOrganizationsInformation from './useOrganizationsInformation'
import { usePermission } from 'hooks'
import { useParams } from 'react-router-dom'
import { RenderIf } from 'utilities'
import { CheckPermission } from 'components'


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
          <CheckPermission ifUserCan="edit name" module="organization">
            {
              ({ permission }) => {
                return <TextInput label="Organization Name" disabled={!permission} {...nameForm.getInputProps('name')} />
              }
            }
          </CheckPermission>
          <Group position="right">
            <CheckPermission ifUserCan="edit name" module="organization">
              <Button type="submit" variant="subtle">Change Name</Button>
            </CheckPermission>
          </Group>
        </Stack>
      </form>
    </Paper>
    <Paper p="md" withBorder>
      <form onSubmit={typeForm.onSubmit(handleUpdateOrganizationType)}>
        <Stack spacing="md">
          <CheckPermission ifUserCan="edit type" module="organization">
            {
              ({ permission }) => {
                return <Select data={orgTypes} {...typeForm.getInputProps('org_type')} label="Organization Type" disabled={!permission} />

              }
            }
          </CheckPermission>
          <Group position="right">
            <CheckPermission ifUserCan="edit type" module="organization">
              <Button type="submit" variant="subtle">Change Type</Button>
            </CheckPermission>
          </Group>
        </Stack>
      </form>
    </Paper>
    <CheckPermission ifUserCan="delete" module="organization">
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
    </CheckPermission>

  </Stack>

}
export default OrganizationsInformation