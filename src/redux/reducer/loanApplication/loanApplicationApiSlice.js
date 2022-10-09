import { apiSlice } from "../../api/apiSlice";

const loanApplicationApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getAllLoanApplications: builder.query({
      query: () => `/loan_applications/`
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
            return acc + obj.unread_count;
          },
          0
        );
        const userUnreads = response.user_summaries.reduce(
          function(acc, obj) {
            return acc + obj.unread_count;
          },
          0
        );
        return channelUnreads + userUnreads;
      }
    }),
    getLoanAppThreadSummaries: builder.query({
      query: (id) => `/chat_messages/thread_summary/?scope_content_type_model=loanapplication&scope_content_type_app_label=loan_management&scope_id=${id}`
    }),

    GetLoanAppUsersAndInvites: builder.query({
      query: (id) => `/loan_applications/${id}/users_and_invites/`,
      providesTags: ["LoanApplicationsInvitations"]
    })
  })
});

export const {
  useGetAllLoanApplicationsQuery,
  useGetOneLoanApplicationQuery,
  useGetLoanApplicationStagesQuery,
  useGetLoanAppThreadSummariesCountQuery,
  useGetLoanAppUsersAndInvitesQuery,
  useGetLoanAppThreadSummariesQuery
} = loanApplicationApiSlice;