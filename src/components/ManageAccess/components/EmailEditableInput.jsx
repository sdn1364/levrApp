import { ActionIcon, Group, TextInput, Tooltip, Center } from '@mantine/core'
import { IconCheck, IconX } from '@tabler/icons'
import { useState } from 'react'
import { useClickOutside, useHover } from '@mantine/hooks'
import { ActionGroup } from '../../index'

const EmailEditableInput = ({ email }) => {

  const ref = useClickOutside(() => HandleClose())

  const [changed, setChanged] = useState(null)
  const [emailInput, setEmailInput] = useState(email)
  const [focused, setFocused] = useState(false)

  const handleOnChange = (e) => {
    setEmailInput(e.target.value)
    setChanged(email)
  }

  const HandleClose = () => {
    setEmailInput(changed)
    setChanged('')
    setFocused(false)
  }

  return <Group>
    <Tooltip label="Click to change">

      <TextInput ref={ref}
                 sx={{ flex: 1 }}
                 defaultValue={emailInput}
                 onChange={handleOnChange}
                 onFocus={() => setFocused(true)}
                 variant={focused ? 'default' : 'unstyled'} />
    </Tooltip>
    {
      changed && <ActionGroup onCancel={HandleClose} />
    }
  </Group>

}
export default EmailEditableInput
