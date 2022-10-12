import { closeUploadDocumentModal } from 'redux/reducer/loanApplication/docRequestSlice'
import { useDispatch } from 'react-redux'

const useFileUploadModal = () => {
  const dispatch = useDispatch()

  const handleCloseFileUploadModal = () => {
    dispatch(closeUploadDocumentModal())
  }
  return { handleCloseFileUploadModal }
}

export default useFileUploadModal
