import { Button, Group, Paper, Stack, Text, TextInput, Title} from "@mantine/core";
import {IconUpload} from "@tabler/icons";
import {useGetUserQuery} from "redux/reducer/auth/authApiSlice";
import AvatarUpload from "./AvatarUpload";

const PersonalInformation = () => {

  const {data: user, isSuccess} = useGetUserQuery();

  return isSuccess && <Stack spacing="xs">
    <Title order={5}>Profile Information</Title>
    <Text size="xs" variant="dimmed">Update your photo and personal details here</Text>
    <Paper p="md" withBorder>


      <Group position="apart">
        <AvatarUpload userId={user.id}/>
        <Button variant="subtle" size="sm" leftIcon={<IconUpload/>}>Upload Image</Button>
      </Group>
    </Paper>
    <Paper p="md" withBorder>
      <form action="">
        <Stack>
          <TextInput
            label="Full Name"
            value={user.fullName}
          />
          <Group position="right">
            <Button variant="subtle">Update Full name</Button>
          </Group>
        </Stack>
      </form>
    </Paper>
  </Stack>

}
export default PersonalInformation;