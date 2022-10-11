import { Modal, Stack, Group, Button } from '@mantine/core'

const GenericModal = ({ children, title, onClose, submit, submitText, opened, size }) => {
  return <Modal opened={opened} title={title} onClose={onClose} size={size} centered>
    <Stack spacing="xl">
      {children}
      <Group position="apart" mt="lg">
        <Button onClick={onClose} variant="subtle">Cancel</Button>
        <Button onClick={submit}>{submitText}</Button>
      </Group>
    </Stack>
  </Modal>
}
export default GenericModal
