import { Tabs, Title, Text, Stack, Container } from '@mantine/core'
import { Content, Heading } from 'components'
import { useGetUserQuery } from 'redux/reducer/auth/authApiSlice'
import AccountSettingsTab from './tabs/AccountSettingsTab'
import SecurityTab from './tabs/SecurityTab'
import AppSettings from './tabs/AppSettings'

const ProfileSettings = () => {

  const { data: user, isSuccess } = useGetUserQuery()

  return <>
    <Tabs defaultValue="settings" variant="pills">

      <Heading tabs={
        <Tabs.List color="gray">
          <Tabs.Tab value="settings">Account Settings</Tabs.Tab>
          <Tabs.Tab value="security">Security</Tabs.Tab>
        </Tabs.List>
      }>
        <Title order={3}>Profile & Preferences</Title>
        {isSuccess ? <Stack spacing="md">
          <Text size="sm" color="dimmed">{user.email}</Text>
          <Text size="sm" color="dimmed">{user.fullName}</Text>
        </Stack> : null}
      </Heading>
      <Content>
        <Tabs.Panel value="settings">
          <AccountSettingsTab />
        </Tabs.Panel>
        <Tabs.Panel value="security">
          <SecurityTab />
        </Tabs.Panel>

      </Content>

    </Tabs>
  </>

}
export default ProfileSettings