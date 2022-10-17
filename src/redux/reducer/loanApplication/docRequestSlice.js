import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  uploadDocumentModal: null,
  newDocumentUploadFormData: {
    name: '',
    fileObject: ''
  },
  newDocRequestModal: false,
  deleteDocumentModalId: null,
  sendMessageModal: null,
  sendEmailModal: null,
  selectedDocRequest: [],
  documentRequestView: 'list',
  apiUploadModal: false,
  uploadRequiredFileModal: null

}

const docRequestSlice = createSlice({
  name: 'docRequest',
  initialState,
  reducers: {
    selectDocRequests: (state, action) => {
      state.selectedDocRequest.push(action.payload)
    },
    unSelectDocRequests: (state, action) => {
      state.selectedDocRequest = state.selectedDocRequest.filter(doc => doc !== action.payload)
    },
    emptyDocReqSelection: (state) => {
      state.selectedDocRequest = []
    },
    changeDocumentRequestView: (state, action) => {
      state.documentRequestView = action.payload
    },
    openSendEmailModal: (state, action) => {
      state.sendEmailModal = action.payload
    },
    closeSendEmailModal: (state) => {
      state.sendEmailModal = null
    },
    openUploadDocumentModal: (state, action) => {
      state.uploadDocumentModal = action.payload
    },
    closeUploadDocumentModal: (state, action) => {
      state.uploadDocumentModal = null
    },
    openDeleteDocRequestConfirm: (state, action) => {
      state.deleteDocumentModalId = action.payload
    },
    closeDeleteDocRequestConfirm: (state, action) => {
      state.deleteDocumentModalId = null
    },
    openAddDocReqModal: (state) => {
      state.newDocRequestModal = true
    },
    closeAddDocRequestModal: (state) => {
      state.newDocRequestModal = false
    },
    openApiUploadModal: (state) => {
      state.apiUploadModal = true
    },
    closeApiUploadModal: (state) => {
      state.apiUploadModal = false
    },
    openUploadRequiredFileModal: (state, action) => {
      state.uploadRequiredFileModal = action.payload
    },
    closeUploadRequiredFileModal: (state) => {
      state.uploadRequiredFileModal = null
    },
    openSendMessageModal: (state, action) => {
      state.sendEmailModal = action.payload
    },
    closeSendMessageModal: (state) => {
      state.sendEmailModal = null
    }
  }
})

export const selectSelectedDocRequest = (state) => state.docRequest.selectedDocRequest
export const selectDocumentRequestView = (state) => state.docRequest.documentRequestView
export const selectSendEmailModal = (state) => state.docRequest.sendEmailModal
export const selectDeleteDocReqModal = (state) => state.docRequest.deleteDocumentModalId
export const selectNewDocRequestModal = (state) => state.docRequest.newDocRequestModal
export const selectFileUploadModal = (state) => state.docRequest.uploadDocumentModal
export const selectApiUploadModal = (state) => state.docRequest.apiUploadModal
export const selectRequiredFileUploadModal = (state) => state.docRequest.uploadRequiredFileModal
export const selectSendMessageModal = (state) => state.docRequest.sendMessageModal
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
  closeApiUploadModal,
  openUploadRequiredFileModal,
  closeUploadRequiredFileModal,
  closeSendMessageModal,
  openSendMessageModal


} = docRequestSlice.actions

export default docRequestSlice.reducer
