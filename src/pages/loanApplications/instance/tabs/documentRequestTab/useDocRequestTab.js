import { useDispatch } from 'react-redux'
import {
  openSendEmailModal,
  closeSendEmailModal, closeDeleteDocRequestConfirm

} from 'redux/reducer/loanApplication/docRequestSlice'
import { StandardString } from 'utilities'
import { useSearchParams } from 'react-router-dom'

const useDocRequestTab = () => {

  let [searchParams, setSearchParams] = useSearchParams()

  const dispatch = useDispatch()


  const handleOpenSendEmailModal = (id) => {
    dispatch(openSendEmailModal(id))
  }

  const handleCloseSendEmailModal = () => {
    dispatch(closeSendEmailModal())
  }


  const handleOnDragEnd = () => {
    console.log('drag ended')
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


  return {
    handleOnDragEnd,
    handleOpenSendEmailModal,
    handleCloseSendEmailModal,
    allTab,
    handleCloseDocReqDeleteConfirmModal,
    handleOpenDocumentGuide
  }
}
export default useDocRequestTab
