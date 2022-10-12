import { apiSlice } from '../../api/apiSlice'

const docRequestApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLoanAppDocRequestOnStage: builder.query({
      query: ({ loanAppId, stageId }) => `document_requests/?loan_application=${loanAppId}`,
      transformResponse: (response, meta, arg) => {
        return response.filter((docReq) => docReq.stage === arg.stageId).sort((a, b) => a.order - b.order)
      },
      providesTags: ['DocumentRequest']
    }),
    getLoanAppDocRequestLength: builder.query({
      query: ({ loanAppId }) => `document_requests/?loan_application=${loanAppId}`,
      transformResponse: (response, meta, arg) => {
        return response.length
      },
      providesTags: ['DocumentRequest']
    }),
    getOneDocRequest: builder.query({
      query: (id) => `document_requests/${id}`,
      providesTags: ['DocumentRequest']
    }),
    getAllRequestGuideTemplate: builder.query({
      query: (id) => `document_request_guide_templates/?document_request_guide=${id}`
    }),
    getDocRequestGuide: builder.query({
      query: () => `document_request_guides/`,
      providesTags: ['docRequestGuides']
    }),
    getAllDocReqGuidePacks: builder.query({
      query: () => `document_request_guide_packs/`
    }),
    getAllDocReqRequiredFiles: builder.query({
      query: (id) => `document_request_required_files/?document_request=${id}`
    }),
    getDocReqRequiredFilesCount: builder.query({
      query: (id) => `document_request_required_files/?document_request=${id}`,
      transformResponse: (response, meta, arg) => {
        return response.length
      }
    }),
    getDocReqFiles: builder.query({
      query: (id) => `document_request_files/?document_request=${id}`
    }),
    getDocReqGuideRailzParams: builder.query({
      query: (id) => `document_request_guides/${id}/`,
      transformResponse: (response, meta, arg) => {
        return response.railz_query_parameters
      }
    }),
    getAllDocRequests: builder.query({
      query: () => `document_requests/`
    }),
    //mutations from here
    updateDocRequestStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `document_requests/${id}/update_status/`,
        method: 'PUT',
        body: { status }
      }),
      invalidatesTags: ['DocumentRequest']
    }),
    createNewApiDocumentUpload: builder.mutation({
      query: ({ reqDocId, query_parameters }) => ({
        url: `document_requests/${reqDocId}/create_new_api_connection_upload/`,
        method: 'POST',
        body: { query_parameters }
      })
    }),
    updateDocRequestName: builder.mutation({
      query: ({ docRequestId, name }) => ({
        url: `document_requests/${docRequestId}/update_name/`,
        method: 'PUT',
        body: { name }
      })
    }),
    reorderDocRequests: builder.mutation({
      query: ({ docReqId, to_stage_id, to_index }) => ({
        url: `document_requests/${docReqId}/reorder/`,
        method: 'PUT',
        body: {
          to_stage_id,
          to_index
        }
      }),
      invalidatesTags: ['DocumentRequest']
    })
  })
})

export const {
  useGetLoanAppDocRequestOnStageQuery,
  useCreateNewDocumentUploadMutation,
  userDeleteDocumentRequestMutation,
  useGetDocumentRequestQuery,
  useSaveDocRequestOrderMutation,
  useUpdateDocRequestStatusMutation,
  useGetLoanAppDocRequestLengthQuery,
  useGetOneDocRequestQuery,
  useGetAllRequestGuideTemplateQuery,
  useGetDocRequestGuideQuery,
  useGetAllDocReqGuidePacksQuery,
  useGetAllDocReqRequiredFilesQuery,
  useGetDocReqRequiredFilesCountQuery,
  useGetDocReqFilesQuery,
  useGetDocReqGuideRailzParamsQuery,
  useCreateNewApiDocumentUploadMutation,
  useUpdateDocRequestNameMutation,
  useGetAllDocRequestsQuery,
  useReorderDocRequestsMutation
} = docRequestApiSlice
