import { apiSlice } from '../../api/apiSlice'

export const organizationsApiSlice = apiSlice.injectEndpoints({

  endpoints: builder => ({
    //queries from here
    getAllOrganizations: builder.query({
      query: () => `organizations/`,
      transformResponse: (response) => {
        return response.filter(res => res.is_deleted === false)
      },
      providesTags: ['Organizations']
    }),
    getOneOrganization: builder.query({
      query: (id) => `organizations/${id}/`,
      providesTags: ['Organization']
    }),
    getOrganizationUserAndInvites: builder.query({
      query: (id) => `organizations/${id}/users_and_invites/`,
      providesTags: ['OrganizationInvitations']
    }),
    // mutations from here
    createOrganization: builder.mutation({
      query: ({ name, org_type }) => ({
        url: `organizations/`,
        method: 'POST',
        body: { name, org_type }
      }),
      invalidatesTags: ['Organizations', 'Users']
    }),
    updateOrganizationName: builder.mutation({
      query: ({ id, name }) => ({
        url: `organizations/${id}/update_name/`,
        method: 'POST',
        body: { name }
      }),
      invalidatesTags: ['Organization']

    }),
    deleteOrganization: builder.mutation({
      query: (id) => ({
        url: `organizations/${id}/`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Organizations']
    }),
    updateOrganizationType: builder.mutation({
      query: ({ id, org_type }) => ({
        url: `organizations/${id}/update_type/`,
        method: 'POST',
        body: { org_type }
      }),
      invalidatesTags: ['Organization']
    }),
    //manage access mutations
    sendOrganizationInvitations: builder.mutation({
      query: ({ id, userRoles }) => ({
        url: `organizations/${id}/bulk_invite_users/`,
        method: 'POST',
        body: { user_roles: userRoles }
      }),
      invalidatesTags: ['OrganizationInvitations']
    }),
    deleteOrganizationUserInvitation: builder.mutation({
      query: ({ organizationId, invitationId }) => ({
        url: `organizations/${organizationId}/delete_invitation/`,
        method: 'DELETE',
        body: { id: invitationId }
      }),
      invalidatesTags: ['OrganizationInvitations']
    }),
    resendOrganizationUserInvitation: builder.mutation({
      query: ({ organizationId, invitationId }) => ({
        url: `organizations/${organizationId}/resend_invitation/`,
        method: 'POST',
        body: { id: invitationId }
      }),
      invalidatesTags: ['OrganizationInvitations']
    }),
    editOrganizationInvitation: builder.mutation({
      query: ({ organizationId, params }) => ({
        url: `organizations/${organizationId}/edit_invitation/`,
        method: 'PUT',
        body: params
      })
    }),
    setOrganizationUserRole: builder.mutation({
      query: ({ organizationId, params }) => ({
        url: `organizations/${organizationId}/set_user_roles/`,
        method: 'PUT',
        body: params

      }),
      invalidatesTags: ['OrganizationInvitations']
    })

  })
})

export const {
  useGetAllOrganizationsQuery,
  useGetOneOrganizationQuery,
  useGetOrganizationUserAndInvitesQuery,
  useCreateOrganizationMutation,
  useUpdateOrganizationNameMutation,
  useUpdateOrganizationTypeMutation,
  // manage access mutations hooks
  useSendOrganizationInvitationsMutation,
  useDeleteOrganizationMutation,
  useDeleteOrganizationUserInvitationMutation,
  useResendOrganizationUserInvitationMutation,
  useEditOrganizationInvitationMutation,
  useSetOrganizationUserRoleMutation
} = organizationsApiSlice
