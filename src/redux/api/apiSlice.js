import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseUrl } from 'api'

export const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl,
  credentials: 'omit',

  prepareHeaders: (headers, { getState, endpoint }) => {
    const token = getState().auth.token || localStorage.getItem('_auth_token')
    if (token) {
      headers.set('authorization', `Token ${token}`)
    }
    if (endpoint !== 'uploadFilesToDocReq') {
      headers.set('Content-Type', 'application/json')
    }
    return headers
  }
})

export const apiSlice = createApi({
  baseQuery: baseQuery,
  tagTypes: ['Organizations', 'User', 'LoanApplications', 'LoanApplication', 'DocumentRequest', 'DocumentRequests'],
  endpoints: (builder) => ({})
})
