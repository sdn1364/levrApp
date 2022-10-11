import { Group, Tooltip, TextInput } from '@mantine/core'
import useEditableTextInput from './useEditableTextInput'
import { ActionGroup } from 'components'

const EditableTextInput = ({ label, defaultValue, save, singleClick }) => {

  const { ref, focused, changed, handleOnFocus, handleOnClose, handleOnChange } = useEditableTextInput(defaultValue, singleClick)

  return <Group ref={ref}>
    <Tooltip label={singleClick ? 'Click to change' : 'Double Click to change'}>
      <TextInput label={label}
                 defaultValue={defaultValue}
                 sx={{ flex: 1 }}
                 onClick={handleOnFocus}
                 onChange={handleOnChange}
                 readOnly={!focused}
                 variant={focused ? 'default' : 'unstyled'} />
    </Tooltip>
    {
      changed && <ActionGroup onOk={() => save(changed)} onCancel={handleOnClose} />
    }
  </Group>
}
export default EditableTextInput
