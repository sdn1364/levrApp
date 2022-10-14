import { useParams } from 'react-router-dom'

import { useGetOneLoanApplicationQuery } from 'redux/reducer/loanApplication/loanApplicationApiSlice'
import { usePermission } from 'hooks'
import { openUploadDocumentModal } from 'redux/reducer/loanApplication/docRequestSlice'
import { useDispatch } from 'react-redux'

const useDocumentRequestRow = (docReq) => {
  const { id: loanAppId } = useParams()

  const { data: loanApplicationInstance } = useGetOneLoanApplicationQuery(loanAppId)
  const dispatch = useDispatch()
  const { canManageDocRequests, canManageDocRequestFiles } = usePermission({
    loanAppId: parseInt(loanAppId),
    documentRequest: docReq,
    borrowerOrganizationId: loanApplicationInstance.borrower_org
  })
  const handleOpenFileUploadModal = (id) => {
    dispatch(openUploadDocumentModal(id))
  }
  return {
    canManageDocRequests, canManageDocRequestFiles, handleOpenFileUploadModal
  }
}
export default useDocumentRequestRow
