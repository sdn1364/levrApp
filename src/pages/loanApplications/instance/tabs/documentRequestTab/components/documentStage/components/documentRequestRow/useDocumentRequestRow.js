import { useDispatch } from 'react-redux'
import { openUploadDocumentModal, closeUploadDocumentModal, selectDocRequests, unSelectDocRequests, openDeleteDocRequestConfirm } from 'redux/reducer/loanApplication/docRequestSlice'
import { useParams } from 'react-router-dom'
import { useCallback, useState } from 'react'
import { useHover } from '@mantine/hooks'
import { useMantineTheme } from '@mantine/core'
import { useGetOneLoanApplicationQuery } from 'redux/reducer/loanApplication/loanApplicationApiSlice'
import { usePermission } from 'hooks'
import { showNotification } from '@mantine/notifications'
import { useUpdateDocRequestNameMutation, useUpdateDocRequestStatusMutation } from 'redux/reducer/loanApplication/docRequestApiSlice'

const useDocumentRequestRow = (docReq) => {
  const { id: loanAppId } = useParams()


  const { data: loanApplicationInstance } = useGetOneLoanApplicationQuery(loanAppId)


  console.log(docReq)

  const { canManageDocRequests, canManageDocRequestFiles } = usePermission({
    loanAppId: loanAppId,
    documentRequest: docReq,
    borrowerOrganizationId: loanApplicationInstance.borrower_org
  })


  return {
    canManageDocRequests, canManageDocRequestFiles
  }
}
export default useDocumentRequestRow
