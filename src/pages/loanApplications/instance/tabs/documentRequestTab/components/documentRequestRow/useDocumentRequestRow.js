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
  const theme = useMantineTheme()
  const dispatch = useDispatch()
  const [updateStatus] = useUpdateDocRequestStatusMutation()
  const [updateDocReqName] = useUpdateDocRequestNameMutation()
  const [opened, setOpened] = useState(false)
  const [checked, setChecked] = useState(false)

  const { hovered, ref } = useHover()
  const handleOpenFileUploadModal = (id) => {
    dispatch(openUploadDocumentModal(id))
  }
  const handleCloseFileUploadModal = () => {
    dispatch(closeUploadDocumentModal())
  }

  const status = [
    { name: 'gray', color: theme.colors['gray'][5] },
    { name: 'purple', color: theme.colors['purple'][5] },
    { name: 'blue', color: theme.colors['blue'][5] },
    { name: 'green', color: theme.colors['green'][5] },
    { name: 'yellow', color: theme.colors['yellow'][5] },
    { name: 'red', color: theme.colors['red'][5] }
  ]
  const handleChangeDocRequestStatus = async (status, id) => {
    await updateStatus({ id, status }).unwrap()
      .then(res =>
        showNotification({
          title: 'Document Request Status changed'
        })
      ).catch(err => console.log(err))
  }

  const { data: loanApplicationInstance } = useGetOneLoanApplicationQuery(loanAppId)


  const handleOpenDocReqDeleteConfirmModal = (docReq) => {
    dispatch(openDeleteDocRequestConfirm(docReq))
  }
  const { canManageDocRequests, canManageDocRequestFiles } = usePermission({
    loanAppId,
    documentRequest: docReq,
    borrowerOrganizationId: loanApplicationInstance.borrower_org
  })

  const handleSelectDocRequest = (id) => {
    dispatch(selectDocRequests(id))
  }

  const handleUnSelectDocRequest = (id) => {
    dispatch(unSelectDocRequests(id))
  }

  const onDocRequestCheckboxCheck = useCallback((e) => {
      if (!checked) {
        handleSelectDocRequest(e.target.value)
        setChecked(true)

      } else {
        handleUnSelectDocRequest(e.target.value)

        setChecked(false)
      }
    },
    [checked, handleSelectDocRequest, handleUnSelectDocRequest]
  )

  const handleUpdateDocReqName = async (value) => {
    await updateDocReqName({
      docRequestId: docReq.id,
      name: value
    }).unwrap().then(res => {
      showNotification({
        title: 'Document Request name changed',
        color: 'green'
      })
    }).catch(err => {
      showNotification({
        title: 'Something went wrong',
        color: 'red'
      })
    })

  }
  return {
    status, hovered, ref,
    opened, setOpened, checked,
    onDocRequestCheckboxCheck,
    handleOpenFileUploadModal,
    handleCloseFileUploadModal, handleUpdateDocReqName,
    handleChangeDocRequestStatus, canManageDocRequests, canManageDocRequestFiles, handleOpenDocReqDeleteConfirmModal
  }
}
export default useDocumentRequestRow
