import { useGetOneOrganizationQuery } from 'redux/reducer/organizations/organizationsApiSlice'
import { useNavigate, useParams } from 'react-router-dom'
import { Tabs, Paper, LoadingOverlay } from '@mantine/core'

import { Content, Heading, PageTitle } from 'components'
import LoanApplicationsTab from './tabs/loanApplicationstab/LoanApplicationsTab'
import SettingsTab from './tabs/settingsTab/SettingsTab'
import Integrations from './tabs/integrationsTab/Integrations'

const OrganizationInstance = () => {

  const { id, tab } = useParams()
  const navigate = useNavigate()
  const defaultTab = 'applications'
  const { data: organization, isSuccess } = useGetOneOrganizationQuery(id)

  const handleTabChange = (value) => {
    navigate(`/organizations/${id}/${value}`)
  }

  return isSuccess && <>
    <Tabs value={tab} defaultValue={defaultTab} variant="pills" onTabChange={handleTabChange}>
      <Heading tabs={
        <Tabs.List>
          <Tabs.Tab value="applications">Loan Applications</Tabs.Tab>
          <Tabs.Tab value="integration">Integrations</Tabs.Tab>
          <Tabs.Tab value="settings">Settings</Tabs.Tab>
        </Tabs.List>
      }>
        <PageTitle hasBack to="/organizations">{organization?.name}</PageTitle>

      </Heading>

      <Content>

        <Tabs.Panel value="applications">
          <LoanApplicationsTab />
        </Tabs.Panel>
        <Tabs.Panel value="integration">
          <Paper p="xs">
            <Integrations organizationName={isSuccess ? organization.name : null} />
          </Paper>
        </Tabs.Panel>
        <Tabs.Panel value="settings">
          <SettingsTab />
        </Tabs.Panel>
      </Content>
    </Tabs>
  </>
}
export default OrganizationInstance
