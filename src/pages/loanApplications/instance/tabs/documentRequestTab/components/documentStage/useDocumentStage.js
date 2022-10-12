import { useParams, useSearchParams } from 'react-router-dom'
import { useGetLoanAppDocRequestOnStageQuery } from 'redux/reducer/loanApplication/docRequestApiSlice'

const useDocumentStage = (stage) => {
  const { id } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()

  const { data: documentRequests, isSuccess, isLoading } = useGetLoanAppDocRequestOnStageQuery({ loanAppId: id, stageId: stage.id }, { skip: stage === null })

  return {
    documentRequests,
    isSuccess, isLoading,
    setSearchParams
  }
}
export default useDocumentStage
