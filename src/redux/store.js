import { configureStore } from '@reduxjs/toolkit'
import sidebarReducer from './reducer/SidebarSlice'
import themeSlice from './reducer/ThemeSlice'
import { apiSlice } from './api/apiSlice'
import authReducer from './reducer/auth/authSlice'
import manageAccessReducer from './reducer/ManageAccessSlice'
import organizationReducer from './reducer/organizations/organizationsSlice'
import loanApplication from './reducer/loanApplication/loanApplicationSlice'
import docRequest from './reducer/loanApplication/docRequestSlice'

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    sidebar: sidebarReducer,
    manageAccess: manageAccessReducer,
    organization: organizationReducer,
    loanApplication: loanApplication,
    theme: themeSlice,
    docRequest: docRequest
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true
})



