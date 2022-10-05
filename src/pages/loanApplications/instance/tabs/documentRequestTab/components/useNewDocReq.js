import {useParams} from "react-router-dom";
import {useGetAllDocReqGuidePacksQuery, useGetDocRequestGuideQuery} from "../../../../../../../redux/reducer/loanApplication/docRequestApiSlice";
import {useGetLoanAppUsersAndInvitesQuery} from "../../../../../../../redux/reducer/loanApplication/loanApplicationApiSlice";
import {useDispatch, useSelector} from "react-redux";
import {closeAddDocRequestModal, openAddDocReqModal, selectNewDocRequestModal} from "../../../../../../../redux/reducer/loanApplication/docRequestSlice";
import {useEffect, useState} from "react";

const useNewDocReq = ()=>{

  const {id} = useParams()
  const dispatch = useDispatch();

  const {data: guidePacks, isSuccess: guidePacksIsSuccess} = useGetAllDocReqGuidePacksQuery();
  const {data: guides, isSuccess: guidesIsSuccess} = useGetDocRequestGuideQuery();
  const {data: rolesAndInvitations, isSuccess: rolesIsSuccess} = useGetLoanAppUsersAndInvitesQuery(id);

  const opened = useSelector(selectNewDocRequestModal)

  const guidePackData = () => {
    let packArray = [];

    if (guidePacksIsSuccess) {
      // eslint-disable-next-line array-callback-return
      guidePacks.map((guidePack) => {
        packArray.push({value: guidePack.id, label: guidePack.name})
      })
    }
    return packArray;
  }

  const [selected, setSelected] = useState(null);

  useEffect(() => {
      let guidesData = [];

      if (guidesIsSuccess) {
        // eslint-disable-next-line array-callback-return
        guides.map(guide => {
          guidesData.push({
            value: `${guide.id}`,
            label: guide.name
          })
        })
        setSelected([guidesData, [],])
      }
    },
    [guidesIsSuccess]);

  const handleSetSelected = (value) => {
    setSelected(value)
  }

  const handleChangePack = (value)=>{
    if(guidePacksIsSuccess){

    }
  }

  const handleOpenNewDocRequestModal = ()=>{
    dispatch(openAddDocReqModal())
  }
  const handleCloseNewDocRequestModal = ()=>{
    dispatch(closeAddDocRequestModal())

  }


  return {
    selected,
    handleChangePack,
    handleSetSelected,
    guidePackData,
    opened,
    handleCloseNewDocRequestModal
  }



}
export default useNewDocReq;