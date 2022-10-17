import { useClickOutside } from '@mantine/hooks'
import { useRef, useState } from 'react'

const useEditableTextInput = (oldValue, singleClick) => {

  const ref = useClickOutside(() => handleOnClose())
  const inputRef = useRef()
  const [changed, setChanged] = useState(null)
  const [focused, setFocused] = useState(false)

  const handleOnFocus = (e) => {
    if (e.detail === 2) {
      setFocused(true)
    }
    if (e.detail === 1 && singleClick) {
      setFocused(true)

    }
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
    inputRef.current.value = oldValue
    setFocused(false)
    setChanged('')
  }
  const resetState = () => {
    setFocused(false)
    setChanged('')
  }

  return {
    ref,
    handleOnFocus,
    handleOnClose,
    handleOnChange,
    changed,
    focused,
    setFocused,
    setChanged,
    resetState,
    inputRef
  }
}
export default useEditableTextInput
