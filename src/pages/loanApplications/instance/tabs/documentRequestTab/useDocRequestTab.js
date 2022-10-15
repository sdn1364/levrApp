import { useDispatch } from 'react-redux'
import {
  openSendEmailModal,
  closeSendEmailModal,
  closeDeleteDocRequestConfirm
} from 'redux/reducer/loanApplication/docRequestSlice'
import { StandardString } from 'utilities'
import { useSearchParams } from 'react-router-dom'
import { showNotification } from '@mantine/notifications'
import { useDeleteDocReqMutation } from 'redux/reducer/loanApplication/docRequestApiSlice'

const useDocRequestTab = () => {

  let [searchParams, setSearchParams] = useSearchParams()
  const [deleteDocReq, { isLoading }] = useDeleteDocReqMutation()
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

  const handleDeleteDocReq = async (docReqId) => {
    await deleteDocReq({
      documentRequestId: docReqId
    }).unwrap()
      .then(res => {
        showNotification({
          title: 'Document Request deleted'
        })
        handleCloseDocReqDeleteConfirmModal()
      }).catch(err => console.log(err))
  }

  return {
    isLoading,
    handleDeleteDocReq,
    handleOpenSendEmailModal,
    handleCloseSendEmailModal,
    handleCloseDocReqDeleteConfirmModal,
    handleOpenDocumentGuide, downloadALlFiles
  }
}
export default useDocRequestTab
