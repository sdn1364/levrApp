import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeApiUploadModal, openApiUploadModal, selectApiUploadModal } from "redux/reducer/loanApplication/docRequestSlice";

const useDocReqGuideDrawer = () => {
  const apiUploadModal = useSelector(selectApiUploadModal);
  const dispatch = useDispatch();


  const handleOpenApiUploadModal = () => {
    dispatch(openApiUploadModal());
  };
  const handleCloseApiUploadModal = () => {
    dispatch(closeApiUploadModal());
  };


  return {
    apiUploadModal,
    handleOpenApiUploadModal,
    handleCloseApiUploadModal
  };

};
export default useDocReqGuideDrawer;