import {Paper,  Stack, Text, Title,Switch} from "@mantine/core";
import {useLocalStorage} from "@mantine/hooks";

const AppSettings = ()=>{

  const [modalDocReqGuide, setModalDocReqGuide] = useLocalStorage({ key: 'modal-docReq', defaultValue: 'drawer' });

  const handleSetModalDocReqModal = ()=>{
    setModalDocReqGuide('modal')
  }

  return <Stack spacing="xs">
    <Title order={5}>General Settings</Title>
    <Text size="xs" variant="dimmed">Change general application settings here</Text>
    <Paper p="md" withBorder>
      <Stack>
        <Switch checked={modalDocReqGuide === 'modal'}
                onChange={handleSetModalDocReqModal}
          label="Show document request guide as a separate window"
        />
      </Stack>
    </Paper>
  </Stack>
}
export default AppSettings;