import { apiSlice } from '../../api/apiSlice'

const docRequestApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLoanAppDocRequestOnStage: builder.query({
      query: ({ loanAppId, stageId }) => `document_requests/?loan_application=${loanAppId}`,
      transformResponse: (response, meta, arg) => {
        return response.filter((docReq) => docReq.stage === arg.stageId).sort((a, b) => a.order - b.order)
      },
      providesTags: ['DocumentRequests']
    }),
    getLoanAppDocRequestLength: builder.query({
      query: ({ loanAppId }) => `document_requests/?loan_application=${loanAppId}`,
      transformResponse: (response, meta, arg) => {
        return response.length
      },
      providesTags: ['DocumentRequest']
    }),
    getOneDocRequest: builder.query({
      query: (id) => `document_requests/${id}/`,
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
      query: (id) => `document_request_files/?document_request=${id}`,
      providesTags: ['DocumentRequestFile']
    }),
    getDocReqGuideRailzParams: builder.query({
      query: (id) => `document_request_guides/${id}/`,
      transformResponse: (response, meta, arg) => {
        return response.railz_query_parameters
      }
    }),
    getAllDocRequests: builder.query({
      query: () => `document_requests/`,
      providesTags: (result, error, arg) =>
        result
          ? [...result.map(({ id }) => ({ type: 'DocumentRequest', id })), 'DocumentRequest']
          : ['DocumentRequest']
    }),
    //mutations from here
    updateDocRequestStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `document_requests/${id}/update_status/`,
        method: 'PUT',
        body: { status }
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'DocumentRequest', id: arg.id }]
    }),
    createNewApiDocumentUpload: builder.mutation({
      query: ({ reqDocId, query_parameters }) => ({
        url: `document_requests/${reqDocId}/create_new_api_connection_upload/`,
        method: 'POST',
        body: { query_parameters }
      }),
      invalidatesTags: ['DocumentRequests']
    }),
    updateDocRequestName: builder.mutation({
      query: ({ docRequestId, name }) => ({
        url: `document_requests/${docRequestId}/update_name/`,
        method: 'PUT',
        body: { name }
      }),
      invalidatesTags: ['DocumentRequests']
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
      invalidatesTags: ['DocumentRequests']
    }),
    updateDocReqNote: builder.mutation({
      query: ({ docReqId, note }) => ({
        url: `document_requests/${docReqId}/update_note/`,
        method: 'PUT',
        body: { note: note }
      }),
      invalidatesTags: ['DocumentRequests']
    }),
    deleteDocReq: builder.mutation({
      query: ({ documentRequestId }) => ({
        url: `document_requests/${documentRequestId}`,
        method: 'DELETE',
        body: {}
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'DocumentRequest', id: arg.id }]
    }),
    deleteUploadedFile: builder.mutation({
      query: (docReqFileId) => ({
        url: `document_request_files/${docReqFileId}`,
        method: 'DELETE',
        body: { id: docReqFileId }
      }),
      invalidatesTags: ['DocumentRequestFile']
    }),
    updateDocReqFileName: builder.mutation({
      query: ({ docReqFileId, name }) => ({
        url: `document_request_files/${docReqFileId}/update_name/`,
        method: 'PUT',
        body: { name }
      }),
      invalidatesTags: ['DocumentRequestFile']
    })
  })
})

export const {
  useGetLoanAppDocRequestOnStageQuery,
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
  useReorderDocRequestsMutation,
  useUpdateDocReqNoteMutation,
  useDeleteDocReqMutation,
  useDeleteUploadedFileMutation,
  useUpdateDocReqFileNameMutation
} = docRequestApiSlice
