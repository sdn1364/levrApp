import { Modal, Stack, Group, Button } from '@mantine/core'

const FormModal = ({ children, title, onClose, onSubmit, opened, size }) => {
  return <Modal opened={opened} title={title} onClose={onClose} size={size} centered>
    <form onSubmit={onSubmit}>
      <Stack spacing="xl">
        {children}
        <Group position="apart" mt="lg">
          <Button onClick={onClose} variant="subtle">Cancel</Button>
          <Button type="submit">Save</Button>
        </Group>
      </Stack>
    </form>
  </Modal>
}
export default FormModal