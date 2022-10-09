import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  uploadDocumentModal: null,
  newDocumentUploadFormData: {
    name: "",
    fileObject: ""
  },
  newDocRequestModal: false,
  deleteDocumentModalId: null,
  sendMessageModal: null,
  sendEmailModal: null,
  selectedDocRequest: [],
  documentRequestView: "list",
  apiUploadModal: false
};

const docRequestSlice = createSlice({
  name: "docRequest",
  initialState,
  reducers: {
    selectDocRequests: (state, action) => {
      state.selectedDocRequest.push(action.payload);
    },
    unSelectDocRequests: (state, action) => {
      state.selectedDocRequest = state.selectedDocRequest.filter(doc => doc !== action.payload);
    },
    emptyDocReqSelection: (state) => {
      state.selectedDocRequest = [];
    },
    changeDocumentRequestView: (state, action) => {
      state.documentRequestView = action.payload;
    },
    openSendEmailModal: (state, action) => {
      state.sendEmailModal = action.payload;
    },
    closeSendEmailModal: (state) => {
      state.sendEmailModal = null;
    },
    openUploadDocumentModal: (state, action) => {
      state.uploadDocumentModal = action.payload;
    },
    closeUploadDocumentModal: (state, action) => {
      state.uploadDocumentModal = null;
    },
    openDeleteDocRequestConfirm: (state, action) => {
      state.deleteDocumentModalId = action.payload;
    },
    closeDeleteDocRequestConfirm: (state, action) => {
      state.deleteDocumentModalId = null;
    },
    openAddDocReqModal: (state) => {
      state.newDocRequestModal = true;
    },
    closeAddDocRequestModal: (state) => {
      state.newDocRequestModal = false;
    },
    openApiUploadModal: (state) => {
      state.apiUploadModal = true;
    },
    closeApiUploadModal: (state) => {
      state.apiUploadModal = false;
    }

  }
});

export const selectSelectedDocRequest = (state) => state.docRequest.selectedDocRequest;
export const selectDocumentRequestView = (state) => state.docRequest.documentRequestView;
export const selectSendEmailModal = (state) => state.docRequest.sendEmailModal;
export const selectDeleteDocReqModal = (state) => state.docRequest.deleteDocumentModalId;
export const selectNewDocRequestModal = (state) => state.docRequest.newDocRequestModal;
export const selectFileUploadModal = (state) => state.docRequest.uploadDocumentModal;
export const selectApiUploadModal = (state) => state.docRequest.apiUploadModal;

export const {
  selectDocRequests,
  unSelectDocRequests,
  emptyDocReqSelection,
  closeSendEmailModal,
  openSendEmailModal,
  openUploadDocumentModal,
  closeUploadDocumentModal,
  openDeleteDocRequestConfirm,
  closeDeleteDocRequestConfirm,
  openAddDocReqModal,
  closeAddDocRequestModal,
  openApiUploadModal,
  closeApiUploadModal

} = docRequestSlice.actions;

export default docRequestSlice.reducer;
