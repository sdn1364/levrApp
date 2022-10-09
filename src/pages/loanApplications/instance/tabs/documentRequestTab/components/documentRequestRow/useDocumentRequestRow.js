import { useDispatch } from "react-redux";
import { openUploadDocumentModal, closeUploadDocumentModal } from "redux/reducer/loanApplication/docRequestSlice";

const useDocumentRequestRow = () => {

  const dispatch = useDispatch();
  const handleOpenFileUploadModal = (id) => {
    dispatch(openUploadDocumentModal(id));
  };
  const handleCloseFileUploadModal = () => {
    dispatch(closeUploadDocumentModal());
  };

  return {
    handleOpenFileUploadModal,
    handleCloseFileUploadModal
  };
};
export default useDocumentRequestRow;