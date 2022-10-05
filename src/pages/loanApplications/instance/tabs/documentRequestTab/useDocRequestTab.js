import {useDispatch} from "react-redux";
import {selectDocRequests,unSelectDocRequests} from 'redux/reducer/loanApplication/docRequestSlice'

const useDocRequestTab = ()=>{


  const dispatch = useDispatch();

  const handleSelectDocRequest = (id)=>{
    dispatch(selectDocRequests(id))
  }
  const handleUnSelectDocRequest = (id)=>{
    dispatch(unSelectDocRequests(id))

  }

  const handleOnDragEnd = ()=>{
    console.log('drag ended')
  }


  return {
    handleSelectDocRequest,
    handleUnSelectDocRequest,
    handleOnDragEnd
  }
}
export default useDocRequestTab;