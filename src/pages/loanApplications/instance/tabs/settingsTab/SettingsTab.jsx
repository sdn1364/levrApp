import { Grid, Paper, Tabs } from '@mantine/core'
import ManageAccessTab from './components/manageAccessTab/ManageAccessTab'

const SettingsTab = () => {
  return <Tabs orientation="vertical" defaultValue="settings" variant="pills">
    <Grid gutter="lg" sx={{ width: '100%' }}>
      <Grid.Col span={3}>
        <Paper p="xs" withBorder>
          <Tabs.List>
            <Tabs.Tab value="settings">Loan Application Information</Tabs.Tab>
            <Tabs.Tab value="access">Manage Access</Tabs.Tab>
          </Tabs.List>
        </Paper>
      </Grid.Col>
      <Grid.Col span={9}>
        <Tabs.Panel value="settings">

        </Tabs.Panel>
        <Tabs.Panel value="access">
          <ManageAccessTab />
        </Tabs.Panel>
      </Grid.Col>
    </Grid>
  </Tabs>
}
export default SettingsTab
