import { openUploadDocumentModal } from 'redux/reducer/loanApplication/docRequestSlice'
import { useDispatch } from 'react-redux'
import { useDeleteUploadedFileMutation, useUpdateDocReqFileNameMutation, useUpdateDocReqNoteMutation } from 'redux/reducer/loanApplication/docRequestApiSlice'
import { useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'

const useDocumentRequestRow = (docReq) => {

  const [updateDocReqNote] = useUpdateDocReqNoteMutation()
  const [deleteUploadedFile] = useDeleteUploadedFileMutation()
  const [updateFileName] = useUpdateDocReqFileNameMutation()
  const dispatch = useDispatch()

  const handleOpenFileUploadModal = (id) => {
    dispatch(openUploadDocumentModal(id))
  }
  const noteForm = useForm({
    initialValues: {
      note: docReq ? docReq.note : ''
    }
  })
  const handleUpdateNote = async ({ note }) => {
    await updateDocReqNote({
      docReqId: docReq.id,
      note: note
    }).unwrap()
      .then(res => {
        showNotification({
          title: 'Document Request Note Updates'
        })
      })
  }
  const handelDeleteUploadedFile = async (docReqFileId) => {
    await deleteUploadedFile(docReqFileId).unwrap()
      .then(res => {
        showNotification({
          title: 'File Deleted',
          color: 'blue'
        })
      }).catch(err => console.log(err))
  }
  const handleUpdateFileName = async ({ value, fileId }) => {
    console.log(fileId)
    await updateFileName({
      docReqFileId: fileId,
      name: value
    }).unwrap()
      .then(res => {
        showNotification({
          title: 'File name updated',
          color: 'green'
        })
      }).catch(err => console.log(err))
  }
  return {
    noteForm,
    handleOpenFileUploadModal,
    handleUpdateNote,
    handelDeleteUploadedFile,
    handleUpdateFileName
  }
}
export default useDocumentRequestRow
