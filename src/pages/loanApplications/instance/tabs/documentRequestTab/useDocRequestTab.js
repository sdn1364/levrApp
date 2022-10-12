import { useDispatch } from 'react-redux'
import {
  openSendEmailModal,
  closeSendEmailModal,
  closeDeleteDocRequestConfirm
} from 'redux/reducer/loanApplication/docRequestSlice'
import { StandardString } from 'utilities'
import { useSearchParams } from 'react-router-dom'
import { useReorderDocRequestsMutation } from 'redux/reducer/loanApplication/docRequestApiSlice'

const useDocRequestTab = () => {

  let [searchParams, setSearchParams] = useSearchParams()

  const dispatch = useDispatch()


  const handleOpenSendEmailModal = (id) => {
    dispatch(openSendEmailModal(id))
  }

  const handleCloseSendEmailModal = () => {
    dispatch(closeSendEmailModal())
  }


  const allTab = (loanAppStages) => {
    let stages = []

    stages = loanAppStages.map(stage => StandardString(stage.name))

    return stages
  }

  const handleCloseDocReqDeleteConfirmModal = () => {
    dispatch(closeDeleteDocRequestConfirm())
  }

  const handleOpenDocumentGuide = (docRecId) => {
    setSearchParams(docRecId)
  }

  const downloadALlFiles = () => {

  }

  return {
    handleOpenSendEmailModal,
    handleCloseSendEmailModal,
    handleCloseDocReqDeleteConfirmModal,
    handleOpenDocumentGuide, downloadALlFiles
  }
}
export default useDocRequestTab
