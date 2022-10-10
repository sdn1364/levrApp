import { Button, Group, Modal, Stack } from '@mantine/core'
import useConfirmModal from './useConfirmModal'

const ConfirmModal = ({ title, opened, children, onClose, submitLabel, onSubmit, isDanger }) => {

  const { renderTitle } = useConfirmModal()

  return <Modal size="md" centered title={renderTitle(isDanger, title)} opened={opened} onClose={onClose}>
    <Stack spacing="xl">
      {children}
      <Group position="apart" mt="lg">
        <Button onClick={onClose} variant="default">Cancel</Button>
        <Button onClick={onSubmit} color={isDanger ? 'red.5' : 'yellow.5'}>{submitLabel}</Button>
      </Group>
    </Stack>
  </Modal>
}
export default ConfirmModal
