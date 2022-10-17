import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  newLoanApplicationsModal: false,
  loanApplicationReminderModal: null,
  loadingLoanApplication: {
    loaded: false,
    step: 'Loading Loan Application',
    percent: {
      loanApp: 0,
      messages: 0,
      stage: 0,
      doRequest: 0
    }
  },
  loanAppDeleteModal: null
}

const loanApplicationSlice = createSlice({
  name: 'loanApplication',
  initialState,
  reducers: {
    setOpenNewLoanApplicationModal: (state) => {
      state.newLoanApplicationsModal = true
    },
    setCloseNewLoanApplicationModal: (state) => {
      state.newLoanApplicationsModal = false
    },
    setOpenLoanApplicationReminderModal: (state, action) => {
      state.loanApplicationReminderModal = action.payload
    },
    setCloseLoanApplicationReminderModal: (state) => {
      state.loanApplicationReminderModal = null
    },
    setLoadingLoanApplication: (state, action) => {
      state.loadingLoanApplication = action.payload
    },
    openLoanAppDeleteModal: (state, action) => {
      state.loanAppDeleteModal = action.payload
    },
    closeLoanAppDeleteModal: (state) => {
      state.loanAppDeleteModal = null
    }
  }
})

export const selectNewLoanApplicationModal = (state) => state.loanApplication.newLoanApplicationsModal
export const selectLoanApplicationReminderModal = (state) => state.loanApplication.loanApplicationReminderModal
export const selectLoanApplicationLoading = (state) => state.loanApplication.loadingLoanApplication
export const selectLoanAppDeleteModal = (state) => state.loanApplication.loanAppDeleteModal

export const {
  setOpenNewLoanApplicationModal,
  setCloseNewLoanApplicationModal,
  setOpenLoanApplicationReminderModal,
  setCloseLoanApplicationReminderModal,
  setLoadingLoanApplication,
  openLoanAppDeleteModal,
  closeLoanAppDeleteModal
} = loanApplicationSlice.actions

export default loanApplicationSlice.reducer
