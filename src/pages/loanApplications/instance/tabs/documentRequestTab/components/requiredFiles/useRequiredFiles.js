import { useDispatch } from 'react-redux'
import { openUploadRequiredFileModal } from '../../../../../../../redux/reducer/loanApplication/docRequestSlice'

const useRequiredFiles = () => {

  const dispatch = useDispatch()

  const handleOpenUploadRequiredFilesModal = (id) => {
    dispatch(openUploadRequiredFileModal(id))
  }

  return { handleOpenUploadRequiredFilesModal }
}

export default useRequiredFiles
