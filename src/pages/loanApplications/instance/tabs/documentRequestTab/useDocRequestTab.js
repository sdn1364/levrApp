import {useDispatch} from "react-redux";
import {
  selectDocRequests,
  unSelectDocRequests,
  openSendEmailModal,
  closeSendEmailModal, openDeleteDocRequestConfirm, closeDeleteDocRequestConfirm,
  openAddDocReqModal, closeAddDocRequestModal
} from 'redux/reducer/loanApplication/docRequestSlice'
import {useUpdateDocRequestStatusMutation} from 'redux/reducer/loanApplication/docRequestApiSlice'
import {showNotification} from "@mantine/notifications";
import {useCallback, useState} from "react";
import {useMantineTheme} from "@mantine/core";
import {StandardString} from "utilities";
import {useSearchParams} from "react-router-dom";

const useDocRequestTab = () => {

  let [searchParams, setSearchParams] = useSearchParams();

  const theme = useMantineTheme();

  const [checked, setChecked] = useState(false);

  const dispatch = useDispatch();

  const [updateStatus] = useUpdateDocRequestStatusMutation();

  const status = [
    {name: 'gray', color: theme.colors['gray'][5]},
    {name: 'purple', color: theme.colors['purple'][5]},
    {name: 'blue', color: theme.colors['blue'][5]},
    {name: 'green', color: theme.colors['green'][5]},
    {name: 'yellow', color: theme.colors['yellow'][5]},
    {name: 'red', color: theme.colors['red'][5]}
  ]

  const handleSelectDocRequest = (id) => {
    dispatch(selectDocRequests(id))
  }

  const handleUnSelectDocRequest = (id) => {
    dispatch(unSelectDocRequests(id))
  }

  const handleOpenSendEmailModal = (id) => {
    dispatch(openSendEmailModal(id))
  }

  const handleCloseSendEmailModal = () => {
    dispatch(closeSendEmailModal())
  }

  const handleChangeDocRequestStatus = async (status, id) => {
    await updateStatus({id, status}).unwrap()
      .then(res =>
        showNotification({
          title: 'Document Request Status changed'
        })
      ).catch(err => console.log(err))
  }

  const handleOnDragEnd = () => {
    console.log('drag ended')
  }
  const onDocRequestCheckboxCheck = useCallback((e) => {
      if (!checked) {
        handleSelectDocRequest(e.target.value)
        setChecked(true)

      } else {
        handleUnSelectDocRequest(e.target.value)

        setChecked(false)
      }
    },
    [checked, handleSelectDocRequest, handleUnSelectDocRequest],
  );
  const allTab = (loanAppStages) => {
    let stages = [];

    stages = loanAppStages.map(stage => StandardString(stage.name))

    return stages;
  }

  const handleOpenDocReqDeleteConfirmModal = (docReq) => {
    dispatch(openDeleteDocRequestConfirm(docReq))
  }
  const handleCloseDocReqDeleteConfirmModal = ()=>{
    dispatch(closeDeleteDocRequestConfirm())
  }

  const handleOpenDocumentGuide = (docRecId)=>{
    setSearchParams(docRecId);
  }



  return {
    status,
    checked,
    handleSelectDocRequest,
    handleUnSelectDocRequest,
    handleOnDragEnd,
    handleOpenSendEmailModal,
    handleCloseSendEmailModal,
    handleChangeDocRequestStatus,
    onDocRequestCheckboxCheck,
    allTab,
    handleOpenDocReqDeleteConfirmModal,
    handleCloseDocReqDeleteConfirmModal,
    handleOpenDocumentGuide,
  }
}
export default useDocRequestTab;