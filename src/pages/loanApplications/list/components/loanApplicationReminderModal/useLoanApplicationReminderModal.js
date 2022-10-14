import { selectLoanApplicationReminderModal, setCloseLoanApplicationReminderModal } from 'redux/reducer/loanApplication/loanApplicationSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useGetLoanAppUsersAndInvitesQuery, useGetOneLoanApplicationQuery, useLoanAppSendReminderMutation } from 'redux/reducer/loanApplication/loanApplicationApiSlice'
import { showNotification } from '@mantine/notifications'
import { useEffect, useState } from 'react'
import { useSetState } from '@mantine/hooks'

const useLoanApplicationReminderModal = () => {
  const opened = useSelector(selectLoanApplicationReminderModal)

  const { data: loanAppUsersAndInvites, isSuccess: loanAppUsersAndInvitesIsSuccess, isLoading } = useGetLoanAppUsersAndInvitesQuery(parseInt(opened), {
    skip: opened === null
  })

  const { data: loanApp, isSuccess: loanAppIsSuccess } = useGetOneLoanApplicationQuery(parseInt(opened), {
    skip: opened === null
  })
  const [sendLoanAppReminder] = useLoanAppSendReminderMutation()

  let value = ''

  if (loanAppIsSuccess) {
    value = loanAppIsSuccess && `<p>Dear ${'recipient'} </p> <p>A friendly reminder that <strong>'${loanApp.loan_description}'</strong> has incomplete document requests waiting for you on Levr.</p>`
  }

  const dispatch = useDispatch()
  const closeLoanApplicationReminderModal = () => {
    dispatch(setCloseLoanApplicationReminderModal())
    setForm({ selectedUsers: [], selectedInvitations: [] })
  }

  const [msg, setMsg] = useState('')

  useEffect(() => {
    if (value !== '') {
      setMsg(value)
    }
  }, [value])


  const [form, setForm] = useSetState({
    message: value,
    selectedUsers: [],
    selectedInvitations: []
  })
  useEffect(() => {
    setForm({ message: msg })
  }, [msg])

  const handleChecked = ({ value, userId, name }) => {
    if (value) {
      setForm({
        [name]: value
          ? [...form[name], userId]
          : form[name].filter((element) => element !== userId)
      })
    }
  }

  const sendReminder = async ({ message, selectedUsers, selectedInvitations }) => {
    await sendLoanAppReminder({
      loanAppId: loanApp.id,
      params: {
        message: message,
        users: selectedUsers,
        invitations: selectedInvitations
      }
    }).unwrap().then(res => {
      showNotification({
        title: 'Reminder Sent',
        color: 'green'
      })
      closeLoanApplicationReminderModal()
      setForm({ selectedUsers: [], selectedInvitations: [] })
    }).catch(
      err => console.log(err)
    )
  }

  return {
    value, opened, isLoading, form, msg, setMsg,
    loanAppUsersAndInvites,
    loanAppUsersAndInvitesIsSuccess,
    closeLoanApplicationReminderModal,
    sendReminder, handleChecked

  }
}
export default useLoanApplicationReminderModal
