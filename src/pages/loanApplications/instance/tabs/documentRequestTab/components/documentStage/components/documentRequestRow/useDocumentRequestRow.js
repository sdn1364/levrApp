import { useParams } from 'react-router-dom'

import { useGetOneLoanApplicationQuery } from 'redux/reducer/loanApplication/loanApplicationApiSlice'
import { usePermission } from 'hooks'

const useDocumentRequestRow = (docReq) => {
  const { id: loanAppId } = useParams()

  const { data: loanApplicationInstance } = useGetOneLoanApplicationQuery(loanAppId)
  
  const { canManageDocRequests, canManageDocRequestFiles } = usePermission({
    loanAppId: parseInt(loanAppId),
    documentRequest: docReq,
    borrowerOrganizationId: loanApplicationInstance.borrower_org
  })

  return {
    canManageDocRequests, canManageDocRequestFiles
  }
}
export default useDocumentRequestRow
