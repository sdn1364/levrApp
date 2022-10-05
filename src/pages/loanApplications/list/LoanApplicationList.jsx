
import {useGetLoanApplicationsQuery} from "redux/reducer/loanApplication/loanApplicationApiSlice";
import LoanApplicationRow from "../components/LoanApplicationRow";

const View = () => {
  const {data: loanApplications, isSuccess, isError, error} = useGetLoanApplicationsQuery();
  return <>
    <div>
      { isSuccess && loanApplications.map((la)=>{
        return <LoanApplicationRow key={la.id} la={la}/>
      })}
    </div>
  </>
}
export default View