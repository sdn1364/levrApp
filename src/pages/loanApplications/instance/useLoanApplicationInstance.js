import { useSelector } from 'react-redux'
import { selectLoanApplicationLoading } from 'redux/reducer/loanApplication/loanApplicationSlice'

const useLoanApplicationInstance = () => {

  const {loaded:loadingLoanApplication } = useSelector(selectLoanApplicationLoading)

  return {
    loadingLoanApplication
  }
}
export default useLoanApplicationInstance