import { ActionIcon, Center } from '@mantine/core'
import { IconCheck, IconX } from '@tabler/icons'

const ActionGroup = ({ onCancel, onOk, loading }) => {
  return <Center inline>
    <ActionIcon variant="subtle" color="green" onClick={onOk} loading={loading}><IconCheck size={18} /></ActionIcon>
    <ActionIcon variant="subtle" color="red" onClick={onCancel}><IconX size={18} /></ActionIcon>
  </Center>
}
export default ActionGroup