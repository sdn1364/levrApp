import { useDispatch } from 'react-redux'
import { closeSendMessageModal } from 'redux/reducer/loanApplication/docRequestSlice'

const useSendMessageModal = () => {
  const dispatch = useDispatch()

  const handleCloseSendMessageModal = () => {
    dispatch(closeSendMessageModal())
  }
  

  return { handleCloseSendMessageModal }
}

export default useSendMessageModal
