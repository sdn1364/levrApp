import {apiSlice} from '../../api/apiSlice';

const docRequestApiSlice = apiSlice.injectEndpoints({
  endpoints: builder =>({
    getLoanAppDocRequestOnStage: builder.query({
      query: ({loanAppId, stageId})=>`/document_request/?loan_application=${loanAppId}`,
/*      transformResponse: (response, meta, arg)=> {
        console.log(arg)
        //return response.filter(docReq=> docReq.stage === arg.stageId).sort((a,b)=> a.order - b.order)
      }*/
    }),
    createNewDocumentUpload: builder.mutation({}),
    deleteDocumentRequest: builder.mutation({}),
    getDocumentRequest: builder.query({}),
    saveDocRequestOrder: builder.mutation({}),
  })
})

export const {
  useGetLoanAppDocRequestRequest,
  useCreateNewDocumentUploadMutation,
  userDeleteDocumentRequestMutation,
  useGetDocumentRequestQuery,
  useSaveDocRequestOrderMutation
} = docRequestApiSlice
