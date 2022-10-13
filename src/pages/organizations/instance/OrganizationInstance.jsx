import { Tabs, Paper, LoadingOverlay } from '@mantine/core'

import { Content, Heading, PageTitle } from 'components'
import LoanApplicationsTab from './tabs/loanApplicationstab/LoanApplicationsTab'
import SettingsTab from './tabs/settingsTab/SettingsTab'
import Integrations from './tabs/integrationsTab/Integrations'
import useOrganizationInstance from './useOrganizationInstance'
import { usePermission } from '../../../hooks'
import { RenderIf } from 'utilities'

const OrganizationInstance = () => {

  const { handleTabChange, defaultTab, organization, isSuccess, isLoading, tab } = useOrganizationInstance()
  const { hasAccessToOrganization } = usePermission({})

  if (isLoading) {
    return <LoadingOverlay visible />
  }

  return isSuccess && <>
    <Tabs value={tab} defaultValue={defaultTab} variant="pills" onTabChange={handleTabChange} keepMounted={false}>
      <Heading tabs={
        <Tabs.List>
          <Tabs.Tab value="applications">Loan Applications</Tabs.Tab>
          <RenderIf isTrue={hasAccessToOrganization(organization.id)}>
            <Tabs.Tab value="integration">Integrations</Tabs.Tab>
          </RenderIf>
          <RenderIf isTrue={hasAccessToOrganization(organization.id)}>
            <Tabs.Tab value="settings">Settings</Tabs.Tab>
          </RenderIf>
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
            <Integrations organization={isSuccess ? organization : null} />
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
