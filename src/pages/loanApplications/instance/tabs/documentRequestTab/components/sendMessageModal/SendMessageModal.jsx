import { Button, Group, Modal, Stack } from '@mantine/core'
import { selectSendMessageModal } from 'redux/reducer/loanApplication/docRequestSlice'
import { useSelector } from 'react-redux'
import useSendMessageModal from './useSendMessageModal'

const SendMessageModal = () => {
  const opened = useSelector(selectSendMessageModal)
  const { handleCloseSendMessageModal } = useSendMessageModal()
  return <Modal opened={opened !== null} onClose={handleCloseSendMessageModal}>
    <Stack spacing="xl">
      <Group position="apart" mt="lg">
        <Button onClick={handleCloseSendMessageModal} variant="subtle">Cancel</Button>
        <Button type="submit">Save</Button>
      </Group>
    </Stack>
  </Modal>
}

export default SendMessageModal
