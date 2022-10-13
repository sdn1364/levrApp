import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setOpenNewLoanApplicationModal } from 'redux/reducer/loanApplication/loanApplicationSlice'

const useEmptyLoanApplicationList = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const navigateToNewLoanApplication = () => {
    dispatch(setOpenNewLoanApplicationModal())
    navigate('/loan-applications')
  }

  return { navigateToNewLoanApplication }
}

export default useEmptyLoanApplicationList
