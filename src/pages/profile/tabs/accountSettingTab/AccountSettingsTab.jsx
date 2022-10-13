import { Stack } from '@mantine/core'
import EmailSettings from './components/emailSettings/EmailSettings'
import PersonalInformation from './components/personalInformation/PersonalInformation'

const AccountSettingsTab = () => {

  return <Stack>
    <PersonalInformation />
    <EmailSettings />
  </Stack>
}
export default AccountSettingsTab
