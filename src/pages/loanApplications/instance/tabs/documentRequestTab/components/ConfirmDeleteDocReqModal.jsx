import { Button, Group, Modal, Text, Stack } from '@mantine/core'
import { useSelector } from 'react-redux'
import { selectDeleteDocReqModal } from 'redux/reducer/loanApplication/docRequestSlice'
import useDocRequestTab from '../useDocRequestTab'


const ConfirmDeleteDocReqModal = () => {

  const { handleCloseDocReqDeleteConfirmModal, handleDeleteDocReq, isLoading } = useDocRequestTab()

  const docRequest = useSelector(selectDeleteDocReqModal)

  return <Modal centered
                opened={docRequest !== null}
                onClose={handleCloseDocReqDeleteConfirmModal}
                title="Are you sure you want to delete this Document Request?"
  >
    <Stack spacing="xl">
      {
        <Text>
          You are about to delete{' '}'{docRequest && docRequest.name}'
        </Text>
      }
      <Group position="apart">
        <Button onClick={handleCloseDocReqDeleteConfirmModal} variant="subtle">Cancel</Button>
        <Button color="red" onClick={() => handleDeleteDocReq(docRequest.id)} loading={isLoading}>Delete</Button>
      </Group>
    </Stack>
  </Modal>
}
export default ConfirmDeleteDocReqModal
