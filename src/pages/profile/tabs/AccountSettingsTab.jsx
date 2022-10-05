import {Stack} from "@mantine/core";
import EmailSettings from "./components/EmailSettings";
import PersonalInformation from "./components/PersonalInformation";

const AccountSettingsTab = ()=>{

  return <Stack>
    <PersonalInformation/>
    <EmailSettings/>
</Stack>
}
export default AccountSettingsTab;
