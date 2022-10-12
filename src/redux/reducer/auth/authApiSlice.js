import { apiSlice } from '../../api/apiSlice'
import { authUrl } from 'api'

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: credentials => ({
        url: `${authUrl}/login/`,
        method: 'POST',
        body: { ...credentials }
      }),
      invalidatesTags: ['User']
    }),
    forgot: builder.mutation({
      query: credentials => ({
        url: `${authUrl}/password/reset/`,
        method: 'POST',
        body: { email: credentials.email }
      })
    }),
    getUser: builder.query({
      query: () => `${authUrl}/user/`,
      providesTags: ['User']

    }),
    getUserImage: builder.query({
      query: (id) => `/users/${id}/profile_image/`,
      providesTags: ['User']
    }),
    updateUserFullName: builder.mutation({
      query: ({ userId, userFullName }) => ({
        url: `/users/${userId}/update_full_name/`,
        method: 'PUT',
        body: { full_name: userFullName }
      }),
      invalidatesTags: ['User']
    }),
    updateUserImage: builder.mutation({
      query: ({ userId, formData }) => ({
        url: `users/${userId}/upload_profile_image/`,
        method: 'PUT',
        body: formData,
        headers: {
          contentType: 'multipart/form-data'
        }
      }),
      invalidatesTags: ['User']
    })
  })
})


export const {
  useLoginMutation,
  useForgotMutation,
  useGetUserQuery,
  useGetUserImageQuery,
  useUpdateUserFullNameMutation,
  useUpdateUserImageMutation
} = authApiSlice