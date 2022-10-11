import { useDispatch } from 'react-redux'
import {
  setOpenNewLoanApplicationModal,
  setOpenLoanApplicationReminderModal
} from 'redux/reducer/loanApplication/loanApplicationSlice'
import { useGetAllLoanApplicationsQuery } from 'redux/reducer/loanApplication/loanApplicationApiSlice'

const useLoanApplicationList = () => {

  const dispatch = useDispatch()

  const { data: loanApplications, isSuccess, isLoading } = useGetAllLoanApplicationsQuery()

  const openNewLoanApplicationModal = () => {
    dispatch(setOpenNewLoanApplicationModal())
  }

  const openLoanApplicationReminderModal = (id) => {
    dispatch(setOpenLoanApplicationReminderModal(id))
  }


  return {
    loanApplications, isSuccess, isLoading,
    openNewLoanApplicationModal,
    openLoanApplicationReminderModal
  }

}
export default useLoanApplicationList
