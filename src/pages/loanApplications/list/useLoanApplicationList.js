import { useDispatch } from 'react-redux'
import {
  setOpenNewLoanApplicationModal,
  setOpenLoanApplicationReminderModal,
  setCloseLoanApplicationReminderModal
} from 'redux/reducer/loanApplication/loanApplicationSlice'
import { useGetAllLoanApplicationsQuery } from 'redux/reducer/loanApplication/loanApplicationApiSlice'

const useLoanApplicationList = () => {

  const dispatch = useDispatch()

  const { data: loanApplications, isSuccess, isLoading } = useGetAllLoanApplicationsQuery()

  const openNewLoanApplicationModal = () => {
    dispatch(setOpenNewLoanApplicationModal())
  }

  const openLoanApplicationReminderModal = () => {
    dispatch(setOpenLoanApplicationReminderModal())
  }
  const closeLoanApplicationReminderModal = () => {
    dispatch(setCloseLoanApplicationReminderModal())
  }

  return {
    loanApplications, isSuccess, isLoading,
    openNewLoanApplicationModal,
    openLoanApplicationReminderModal,
    closeLoanApplicationReminderModal
  }

}
export default useLoanApplicationList
