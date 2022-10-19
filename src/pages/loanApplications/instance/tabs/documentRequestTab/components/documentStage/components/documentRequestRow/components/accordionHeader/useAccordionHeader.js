import { useMantineTheme } from '@mantine/core'
import { useCallback, useState } from 'react'
import { useHover } from '@mantine/hooks'
import { openDeleteDocRequestConfirm, openSendMessageModal, openUploadDocumentModal, selectDocRequests, unSelectDocRequests } from 'redux/reducer/loanApplication/docRequestSlice'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { showNotification } from '@mantine/notifications'
import { useUpdateDocRequestNameMutation, useUpdateDocRequestStatusMutation } from 'redux/reducer/loanApplication/docRequestApiSlice'
import { useGetOneLoanApplicationQuery } from 'redux/reducer/loanApplication/loanApplicationApiSlice'

const useAccordionHeader = (docReq) => {
  const { id: loanAppId } = useParams()
  const theme = useMantineTheme()
  const { hovered, ref } = useHover()
  const [checked, setChecked] = useState(false)
  const dispatch = useDispatch()
  const [updateStatus] = useUpdateDocRequestStatusMutation()
  const [updateDocReqName] = useUpdateDocRequestNameMutation()
  const { data: loanApplicationInstance } = useGetOneLoanApplicationQuery(loanAppId)

  const status = [
    { name: 'gray', color: theme.colors['gray'][5] },
    { name: 'purple', color: theme.colors['purple'][5] },
    { name: 'blue', color: theme.colors['blue'][5] },
    { name: 'green', color: theme.colors['green'][5] },
    { name: 'yellow', color: theme.colors['yellow'][5] },
    { name: 'red', color: theme.colors['red'][5] }
  ]


  const handleSelectDocRequest = (id) => {
    dispatch(selectDocRequests(id))
  }

  const handleUnSelectDocRequest = (id) => {
    dispatch(unSelectDocRequests(id))
  }
  const handleOpenDocReqDeleteConfirmModal = (docReq) => {
    dispatch(openDeleteDocRequestConfirm(docReq))
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
  const handleOpenFileUploadModal = (id) => {
    dispatch(openUploadDocumentModal(id))
  }
  const handleChangeDocRequestStatus = async (status, id) => {
    await updateStatus({ id, status }).unwrap()
      .then(res => {
          showNotification({
            title: 'Document Request Status changed'
          })
        }
      ).catch(err => console.log(err))
  }
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
  const handleOpenSendMessageModal = (id) => {
    dispatch(openSendMessageModal(id))
  }

  return {
    status, hovered, ref, checked, onDocRequestCheckboxCheck,
    handleOpenDocReqDeleteConfirmModal,
    handleOpenFileUploadModal,
    handleChangeDocRequestStatus,
    handleUpdateDocReqName,
    handleOpenSendMessageModal
  }
}

export default useAccordionHeader
