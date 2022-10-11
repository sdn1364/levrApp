import { selectLoanApplicationReminderModal, setCloseLoanApplicationReminderModal } from 'redux/reducer/loanApplication/loanApplicationSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useGetLoanAppUsersAndInvitesQuery, useGetOneLoanApplicationQuery } from 'redux/reducer/loanApplication/loanApplicationApiSlice'

const useLoanApplicationReminderModal = () => {
  const opened = useSelector(selectLoanApplicationReminderModal)

  const { data: loanAppUsersAndInvites, isSuccess: loanAppUsersAndInvitesIsSuccess, isLoading } = useGetLoanAppUsersAndInvitesQuery(parseInt(opened), {
    skip: opened === null
  })

  const { data: loanApp, isSuccess: loanAppIsSuccess } = useGetOneLoanApplicationQuery(parseInt(opened), {
    skip: opened === null
  })

  let value = ''

  if (loanAppIsSuccess) {
    value = loanAppIsSuccess && `<p>Dear ${'recipient'} </p> <p>A friendly reminder that <strong>'${loanApp.loan_description}'</strong> has incomplete document requests waiting for you on Levr.</p>`
  }

  const dispatch = useDispatch()
  const closeLoanApplicationReminderModal = () => {
    dispatch(setCloseLoanApplicationReminderModal())
  }

  const sendReminder = (values) => {
    console.log(values)
  }

  return {
    value, opened, isLoading,
    loanAppUsersAndInvites,
    loanAppUsersAndInvitesIsSuccess,
    closeLoanApplicationReminderModal,
    sendReminder

  }
}
export default useLoanApplicationReminderModal
