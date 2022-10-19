import { useDispatch, useSelector } from 'react-redux'
import { closeSendMessageModal, selectSendMessageModal } from 'redux/reducer/loanApplication/docRequestSlice'
import { useGetOneDocRequestQuery } from 'redux/reducer/loanApplication/docRequestApiSlice'
import { useGetLoanAppThreadSummariesQuery, useSendChatMessageMutation } from 'redux/reducer/loanApplication/loanApplicationApiSlice'
import { useNavigate, useParams } from 'react-router-dom'
import { useSetState } from '@mantine/hooks'
import { useEffect, useState } from 'react'
import { showNotification } from '@mantine/notifications'

const useSendMessageModal = () => {
  const dispatch = useDispatch()
  const docReqId = useSelector(selectSendMessageModal)
  const { id: loanAppId } = useParams()
  const navigate = useNavigate()

  const { data: docReq, isSuccess: docReqIsSuccess, isLoading: docReqIsLoading } = useGetOneDocRequestQuery(docReqId, { skip: (docReqId === 'null' || docReqId === null) })
  const { data: threadSummaries, isSuccess: threadSummariesIsSuccess, isLoading: threadSummariesIsLoading } = useGetLoanAppThreadSummariesQuery(loanAppId)
  const [sendChatMessage] = useSendChatMessageMutation()
  const [msg, setMsg] = useState('')

  const [form, setForm] = useSetState({
    message: '',
    selectedUsers: null,
    recipientType: ''
  })

  const handleChecked = (value) => {
    let val = value.split('-')
    setForm({ selectedUsers: val[1], recipientType: val[0] })
  }
  const handleCloseSendMessageModal = () => {
    dispatch(closeSendMessageModal())
    setForm({
      message: '',
      selectedUsers: null,
      recipientType: ''
    })
    setMsg('')
  }

  useEffect(() => {
    setForm({ message: msg })
  }, [msg])

  const sendMessage = async () => {

    if (form.recipientType === 'channel') {
      await sendChatMessage({
        messageText: form.message,
        toChannelId: form.selectedUsers,
        loanAppId,
        fromDocumentRequestId: docReqId
      }).unwrap()
        .then(res => {
          showNotification({
            title: 'Document Request sent as a message',
            color: 'green'
          })
          handleCloseSendMessageModal()
        }).catch(err => {
          console.log(err)
        })
      navigate(`/loan-applications/${loanAppId}/messages?selectedChannelId=${form.selectedUsers}&selectedUserId=undefined`)
    } else if (form.recipientType === 'user') {
      await sendChatMessage({
        messageText: form.message,
        toUserId: form.selectedUsers,
        loanApplicationId: loanAppId,
        fromDocumentRequestId: docReqId
      }).unwrap()
        .then(res => {
          showNotification({
            title: 'Document Request sent as a message',
            color: 'green'
          })
          handleCloseSendMessageModal()
        }).catch(err => {
          console.log(err)
        })
      navigate(`/loan-applications/${loanAppId}/messages?selectedChannelId=undefined&selectedUserId=${form.selectedUsers}`)
    }
  }

  return {
    docReqId,
    docReq,
    docReqIsSuccess,
    docReqIsLoading,
    threadSummaries,
    threadSummariesIsSuccess,
    threadSummariesIsLoading,
    msg, setMsg,
    handleCloseSendMessageModal,
    handleChecked,
    sendMessage
  }
}

export default useSendMessageModal
