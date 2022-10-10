import { useDispatch } from 'react-redux'
import {
  setOpenNewLoanApplicationModal,
  setCloseNewLoanApplicationModal,
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
  const closeNewLoanApplicationModal = () => {
    dispatch(setCloseNewLoanApplicationModal())
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
    closeNewLoanApplicationModal,
    openLoanApplicationReminderModal,
    closeLoanApplicationReminderModal
  }

}
export default useLoanApplicationList
