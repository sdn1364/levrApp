import {apiSlice} from "../../api/apiSlice";
import {LOGIN, RESET,USER, USERS} from 'api';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder=>({
    login: builder.mutation({
      query: credentials => ({
        url: LOGIN,
        method: 'POST',
        body: {...credentials}
      }),
      invalidatesTags: ['User']
    }),
    forgot: builder.mutation({
      query: credentials =>({
        url: RESET,
        method: 'POST',
        body: {email: credentials.email}
      })
    }),
    getUser: builder.query({
      query: ()=>USER,
      providesTags: ['User'],

    }),
    getUserImage: builder.query({
      query: (id)=>`${USERS + id}/profile_image/`,
      providesTags: ['User']
    })
  })
})


export const {
  useLoginMutation,
  useForgotMutation,
  useGetUserQuery,
  useGetUserImageQuery
} = authApiSlice