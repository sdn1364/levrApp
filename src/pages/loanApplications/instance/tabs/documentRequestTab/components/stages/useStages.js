import { useParams } from 'react-router-dom'
import { useGetLoanApplicationStagesQuery } from 'redux/reducer/loanApplication/loanApplicationApiSlice'
import { useGetAllDocRequestsQuery, useReorderDocRequestsMutation } from 'redux/reducer/loanApplication/docRequestApiSlice'
import { StandardString } from 'utilities'
import { useListState } from '@mantine/hooks'

const useStages = () => {
  const { id } = useParams()
  const [reorderDocRequest] = useReorderDocRequestsMutation()

  const { data: loanAppStages, isSuccess, isLoading } = useGetLoanApplicationStagesQuery(id)

  const { data: allDocRequests, isSuccess: allDocReqIsSuccess, isLoading: allDocReqIsLoading } = useGetAllDocRequestsQuery()

  const [docRequestOrderPerStage, docRequestOrderPerStageHandler] = useListState()


  const docRequestPerStage = () => {
    const ordering = {}
    if (isSuccess && allDocReqIsSuccess) {


      loanAppStages.forEach((stage) => {
        ordering[stage.id] = allDocRequests
          .filter((docRequest) => docRequest.stage === stage.id)
          .sort((a, b) => a.order - b.order)
          .map((docRequest) => docRequest.id)
      })
    }
    return ordering
  }

  const allTab = () => {
    let stages = []

    stages = loanAppStages.map(stage => StandardString(stage.name))

    return stages
  }

  const handleOnDragEnd = async (result) => {
    const { destination, source, draggableId } = result
    if (!destination) {
      return // dropped outside the list
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return // dropped in the same place
    }

    const toStageId = parseInt(destination.droppableId.replace('stage-', ''))
    const toIndex = destination.index
    const documentRequestId = parseInt(draggableId.replace('docReq_', ''))

    console.log(toStageId)


    await reorderDocRequest({
      docReqId: documentRequestId,
      to_stage_id: toStageId,
      to_index: toIndex
    }).unwrap().then().catch(err => console.log(err))

  }

  return { loanAppStages, docRequestOrderPerStage, isSuccess, allDocRequests, allDocReqIsSuccess, isLoading, allDocReqIsLoading, allTab, handleOnDragEnd, docRequestPerStage }

}

export default useStages
