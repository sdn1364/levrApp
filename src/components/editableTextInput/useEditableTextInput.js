import { useClickOutside } from '@mantine/hooks'
import { useState } from 'react'

const useEditableTextInput = (oldValue) => {

  const ref = useClickOutside(() => handleOnClose())
  const [changed, setChanged] = useState(null)
  const [focused, setFocused] = useState(false)

  const handleOnFocus = (e) => {
    if (e.detail === 2)
      setFocused(true)
  }
  const handleOnClose = () => {
    if (focused) {
      setFocused(false)
      setChanged(null)
      reset(oldValue)
    }
  }
  const handleOnChange = (e) => {
    setChanged(e.target.value)
  }
  const reset = () => {
    ref.current.value = oldValue
  }

  return {
    ref,
    handleOnFocus,
    handleOnClose,
    handleOnChange,
    changed,
    focused
  }
}
export default useEditableTextInput
