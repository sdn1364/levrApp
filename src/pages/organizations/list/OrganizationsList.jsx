import { Button, LoadingOverlay, Stack, Text } from '@mantine/core'
import { IconPlus } from '@tabler/icons'

import OrganizationRow from './components/organizationRow/OrganizationRow'
import { CheckPermission, Content, Heading, PageTitle } from 'components'
import NewOrganizationModal from './components/newOrganizationModal/NewOrganizationModal'
import useOrganizationList from './useOrganizationList'

const OrganizationsList = () => {


  const { organizations, isSuccess, isLoading, openNewOrganizationModal } = useOrganizationList()

  if (isLoading) {
    return <LoadingOverlay visible />
  }

  return <>
    <Heading>
      <PageTitle>All Organizations</PageTitle>
      <Button onClick={openNewOrganizationModal}
              variant="primary"
              leftIcon={<IconPlus size={18} />}>New Organization</Button>
    </Heading>
    <Content>

      <Stack spacing="sm">

        {isSuccess && organizations.map((org) => (
          <OrganizationRow key={org.id} organization={org} />
        ))}
      </Stack>
    </Content>
    <NewOrganizationModal />
  </>
}

export default OrganizationsList

