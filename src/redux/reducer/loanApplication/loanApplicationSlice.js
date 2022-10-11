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
  }
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
    }
  }
})

export const selectNewLoanApplicationModal = (state) => state.loanApplication.newLoanApplicationsModal
export const selectLoanApplicationReminderModal = (state) => state.loanApplication.loanApplicationReminderModal
export const selectLoanApplicationLoading = (state) => state.loanApplication.loadingLoanApplication

export const {
  setOpenNewLoanApplicationModal,
  setCloseNewLoanApplicationModal,
  setOpenLoanApplicationReminderModal,
  setCloseLoanApplicationReminderModal,
  setLoadingLoanApplication
} = loanApplicationSlice.actions

export default loanApplicationSlice.reducer
