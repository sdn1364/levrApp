import { Center, Title, Text, Button, Stack, Box } from '@mantine/core'
import { IconFiles } from '@tabler/icons'
import useNewDocReq from './useNewDocReq'

const EmptyDocRequest = () => {
  const { handleOpenNewDocRequestModal } = useNewDocReq()

  return <Box sx={{ flex: 1, padding: '20px 520px 20px 50px' }}>
    <Center sx={{ height: '60vh' }}>
      <Stack spacing="lg">
        <Center><IconFiles stroke={0.5} size={120} /></Center>
        <Title order={2} align="center">No Document Request</Title>
        <Stack spacing="xs" mb={30}>
          <Text align="center" color="dimmed">No document has been requested</Text>
          <Text align="center" color="dimmed">Get Started by adding a document request</Text>
        </Stack>
        <Button onClick={handleOpenNewDocRequestModal}>Add Document request</Button>
      </Stack>
    </Center></Box>

}
export default EmptyDocRequest