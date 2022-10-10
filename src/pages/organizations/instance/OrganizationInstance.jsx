import { Tabs, Paper, LoadingOverlay } from '@mantine/core'

import { Content, Heading, PageTitle } from 'components'
import LoanApplicationsTab from './tabs/loanApplicationstab/LoanApplicationsTab'
import SettingsTab from './tabs/settingsTab/SettingsTab'
import Integrations from './tabs/integrationsTab/Integrations'
import useOrganizationInstance from './useOrganizationInstance'

const OrganizationInstance = () => {

  const { handleTabChange, defaultTab, organization, isSuccess, isLoading, tab } = useOrganizationInstance()

  if (isLoading) {
    return <LoadingOverlay visible />
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
