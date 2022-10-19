import { closeUploadDocumentModal, selectFileUploadModal } from 'redux/reducer/loanApplication/docRequestSlice'
import { useDispatch, useSelector } from 'react-redux'
import { showNotification } from '@mantine/notifications'
import { useState } from 'react'
import { useUploadFilesToDocReqMutation } from 'redux/reducer/loanApplication/docRequestApiSlice'
import { useForm } from '@mantine/form'

const useFileUploadModal = () => {
  const dispatch = useDispatch()
  const docReqId = useSelector(selectFileUploadModal)
  //const [files, handlers] = useListState(null)
  const [files, setFiles] = useState([])
  const [uploadFiles, { isLoading }] = useUploadFilesToDocReqMutation()

  const form = useForm({
    initialValues: {
      file: '',
      name: files.length > 0 ? files[0].name : ''
    }
  })

  const handleCloseFileUploadModal = () => {
    dispatch(closeUploadDocumentModal())
    setFiles([])
    form.setFieldValue('name', '')
  }
  const handleUploadFiles = async (values) => {
    console.log(values)
    const formData = new FormData()

    formData.append('file', values.file)
    formData.append('name', values.name)
    /*showNotification({
      title: 'Uploading files to Document Request',
      message: `${0} files uploaded`,
      loading: true
    })*/
    await uploadFiles({
      documentRequestId: docReqId,
      formData: formData
    }).unwrap().then(
      res => showNotification({
        title: 'File uploaded to Document Request',
        color: 'green'
      })
    ).catch(err => console.log(err))
  }
  const handleAddFiles = (values) => {
    setFiles(values)
    form.setFieldValue('file', values[0])
    form.setFieldValue('name', values[0].name)
  }
  const handleRemoveFiles = () => {
    setFiles([])
  }

  return {
    docReqId,
    files,
    form,
    handleCloseFileUploadModal,
    handleUploadFiles,
    handleAddFiles, handleRemoveFiles
  }
}

export default useFileUploadModal
