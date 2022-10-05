import {apiSlice} from "../../api/apiSlice";

export const organizationsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder=>({
    getOrganizations: builder.query({
      query: ()=>'/organizations',
      keepUnusedDataFor: 5
    })
  })
})


export const {
  useGetOrganizationsQuery
} = organizationsApiSlice