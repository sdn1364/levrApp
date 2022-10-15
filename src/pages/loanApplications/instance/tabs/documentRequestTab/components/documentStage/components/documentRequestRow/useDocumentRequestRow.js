import { useParams } from 'react-router-dom'

import { useGetOneLoanApplicationQuery } from 'redux/reducer/loanApplication/loanApplicationApiSlice'
import { usePermission } from 'hooks'
import { openUploadDocumentModal } from 'redux/reducer/loanApplication/docRequestSlice'
import { useDispatch } from 'react-redux'
import { useUpdateDocReqNoteMutation } from 'redux/reducer/loanApplication/docRequestApiSlice'
import { useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'

const useDocumentRequestRow = (docReq) => {
  const { id: loanAppId } = useParams()

  const { data: loanApplicationInstance } = useGetOneLoanApplicationQuery(loanAppId)
  const [updateDocReqNote] = useUpdateDocReqNoteMutation()
  const dispatch = useDispatch()
  const { canManageDocRequests, canManageDocRequestFiles } = usePermission({
    loanAppId: parseInt(loanAppId),
    documentRequest: docReq,
    borrowerOrganizationId: loanApplicationInstance.borrower_org
  })
  const handleOpenFileUploadModal = (id) => {
    dispatch(openUploadDocumentModal(id))
  }
  const noteForm = useForm({
    initialValues: {
      note: docReq ? docReq.note : ''
    }
  })
  const handleUpdateNote = async ({ note }) => {
    await updateDocReqNote({
      docReqId: docReq.id,
      note: note
    }).unwrap()
      .then(res => {
        showNotification({
          title: 'Doceument Request Note Updates'
        })
      })
  }

  return {
    noteForm,
    canManageDocRequests,
    canManageDocRequestFiles,
    handleOpenFileUploadModal,
    handleUpdateNote
  }
}
export default useDocumentRequestRow
