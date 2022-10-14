import { apiSlice } from '../../api/apiSlice'

const loanApplicationApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getAllLoanApplications: builder.query({
      query: () => `/loan_applications/`,
      providesTags: ['loanApplications']
    }),
    getOneLoanApplication: builder.query({
      query: (id) => `/loan_applications/${id}/`
    }),
    getLoanApplicationStages: builder.query({
      query: (id) => `/loan_application_stages/?loan_application=${id}`
    }),
    getLoanAppThreadSummariesCount: builder.query({
      query: (id) => `/chat_messages/thread_summary/?scope_content_type_model=loanapplication&scope_content_type_app_label=loan_management&scope_id=${id}`,
      transformResponse: (response, meta, arg) => {

        const channelUnreads = response.channel_summaries.reduce(
          function(acc, obj) {
            return acc + obj.unread_count
          },
          0
        )
        const userUnreads = response.user_summaries.reduce(
          function(acc, obj) {
            return acc + obj.unread_count
          },
          0
        )
        return channelUnreads + userUnreads
      }
    }),
    getLoanAppThreadSummaries: builder.query({
      query: (id) => `/chat_messages/thread_summary/?scope_content_type_model=loanapplication&scope_content_type_app_label=loan_management&scope_id=${id}`
    }),
    GetLoanAppUsersAndInvites: builder.query({
      query: (id) => `loan_applications/${id}/users_and_invites/`,
      providesTags: ['LoanApplicationsInvitations']
    }),
    //loan app mutations
    createLoanApplication: builder.mutation({
      query: ({ org_id, requested_amount, loan_description }) => ({
        url: `organizations/${org_id}/create_loanapp/`,
        method: 'POST',
        body: {
          org_id,
          requested_amount,
          loan_description
        }
      }),
      invalidatesTags: ['loanApplications']
    }),
    addNewDocReqToLoanApp: builder.mutation({
      query: ({
                loanAppId,
                documentRequestGuides,
                assignedToUsers,
                assignedToInvitations
              }) => ({
        url: `loan_applications/${loanAppId}/create_new_document_requests/`,
        method: 'POST',
        body: {
          document_request_guides: documentRequestGuides,
          assigned_to_user: assignedToUsers,
          assigned_to_invitations: assignedToInvitations
        }
      })
    }),
    //Loan application manage access mutations
    sendLoanAppInvitations: builder.mutation({
      query: ({ id, userRoles }) => ({
        url: `loan_applications/${id}/bulk_invite_users/`,
        method: 'POST',
        body: { user_roles: userRoles }
      }),
      invalidatesTags: ['LoanApplicationsInvitations']
    }),
    deleteLoanAppUserInvitation: builder.mutation({
      query: ({ loanAppId, invitationId }) => ({
        url: `loan_applications/${loanAppId}/delete_invitation/`,
        method: 'DELETE',
        body: { id: invitationId }
      }),
      invalidatesTags: ['LoanApplicationsInvitations']
    }),
    resendLoanAppUserInvitation: builder.mutation({
      query: ({ loanAppId, invitationId }) => ({
        url: `loan_applications/${loanAppId}/resend_invitation/`,
        method: 'POST',
        body: { id: invitationId }
      }),
      invalidatesTags: ['LoanApplicationsInvitations']
    }),
    editLoanAppInvitation: builder.mutation({
      query: ({ loanAppId, params }) => ({
        url: `loan_applications/${loanAppId}/edit_invitation/`,
        method: 'PUT',
        body: params
      }),
      invalidatesTags: ['LoanApplicationsInvitations']

    }),
    setLoanAppUserRole: builder.mutation({
      query: ({ loanAppId, params }) => ({
        url: `loan_applications/${loanAppId}/set_user_roles/`,
        method: 'PUT',
        body: params

      }),
      invalidatesTags: ['LoanApplicationsInvitations']
    }),
    loanAppSendReminder: builder.mutation({
      query: ({ loanAppId, params }) => ({
        url: `loan_applications/${loanAppId}/send_reminder/`,
        method: 'POST',
        body: params
      })
    })
  })
})

export const {
  useGetAllLoanApplicationsQuery,
  useGetOneLoanApplicationQuery,
  useGetLoanApplicationStagesQuery,
  useGetLoanAppThreadSummariesCountQuery,
  useGetLoanAppUsersAndInvitesQuery,
  useGetLoanAppThreadSummariesQuery,
  //loan application mutations from here
  useCreateLoanApplicationMutation,
  //manage access mutation hooks
  useSendLoanAppInvitationsMutation,
  useDeleteLoanAppUserInvitationMutation,
  useResendLoanAppUserInvitationMutation,
  useEditLoanAppInvitationMutation,
  useSetLoanAppUserRoleMutation,
  useAddNewDocReqToLoanAppMutation,
  useLoanAppSendReminderMutation
} = loanApplicationApiSlice
