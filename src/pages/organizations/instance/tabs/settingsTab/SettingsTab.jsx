import {Tabs, Paper, Grid} from "@mantine/core";
import OrganizationsInformationTab from "./components/OrganizationsInformationTab";
import ManageAccessTab from "./components/ManageAccessTab";

const SettingsTab = () => {

  return <Tabs orientation="vertical" defaultValue="settings" variant="pills">
    <Grid gutter="lg" sx={{width: '100%'}}>
      <Grid.Col span={3}>
        <Paper p="xs" withBorder>
          <Tabs.List>
            <Tabs.Tab value="settings" >Organization Information</Tabs.Tab>
            <Tabs.Tab value="access" >Manage Access</Tabs.Tab>
          </Tabs.List>
        </Paper>
      </Grid.Col>
      <Grid.Col span={9}>
        <Tabs.Panel value="settings">
          <OrganizationsInformationTab/>
        </Tabs.Panel>
        <Tabs.Panel value="access">
          <ManageAccessTab/>
        </Tabs.Panel>
      </Grid.Col>
    </Grid>
  </Tabs>
}
export default SettingsTab;
