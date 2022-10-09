import {useDispatch} from "react-redux";
import {
  setOpenNewLoanApplicationModal,
  setCloseNewLoanApplicationModal,
  setOpenLoanApplicationReminderModal,
  setCloseLoanApplicationReminderModal,
} from 'redux/reducer/loanApplication/loanApplicationSlice';

const useLoanApplicationList = ()=>{

  const dispatch = useDispatch();

  const openNewLoanApplicationModal = ()=>{
    dispatch(setOpenNewLoanApplicationModal())
  }
  const closeNewLoanApplicationModal = ()=>{
    dispatch(setCloseNewLoanApplicationModal());
  }
  const openLoanApplicationReminderModal= ()=>{
    dispatch(setOpenLoanApplicationReminderModal())
  }
  const closeLoanApplicationReminderModal = ()=>{
    dispatch(setCloseLoanApplicationReminderModal())
  }

  return {
    openNewLoanApplicationModal,
    closeNewLoanApplicationModal,
    openLoanApplicationReminderModal,
    closeLoanApplicationReminderModal
  }

}
export default useLoanApplicationList;
