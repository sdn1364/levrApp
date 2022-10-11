import { useState } from 'react'
import JSZip from 'jszip'
import JSZipUtils from 'jszip-utils'
import { saveAs } from 'save-as'
import { useParams } from 'react-router-dom'
import { useGetAllDocRequestsQuery, useGetDocReqFilesQuery } from 'redux/reducer/loanApplication/docRequestApiSlice'

const useDownloadAll = () => {
  const { id: loanApplicationId } = useParams()
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const { data: allDocumentRequestsObject, isSuccess } = useGetAllDocRequestsQuery()

  function handleClick() {
    setLoading(true)

    // Fetch all DocRequests for current LoanApp
    const docRequestsThisLoanApp = Object.values(allDocumentRequestsObject)
      .filter((docRequest) => docRequest.loanApplication === loanApplicationId)

    // Set up values for Zip
    const zip = new JSZip()
    let count = 0
    const totCount = docRequestsThisLoanApp.reduce(
      function(prev, obj) {
        return prev + obj.uploadCount
      },
      0
    )
    const zipFilename = `levr_loanapp${loanApplicationId}_all_files.zip`

    // Fetch each file for each DocRequest and add it into the zip
    docRequestsThisLoanApp.forEach(function(docRequest, index) {
      //const { data: allDocumentRequestFilesList, isSuccess: allDocReqFileIsSuccess } = useGetDocReqFilesQuery(docRequest.id)
      getDocumentRequestFiles({ documentRequestId: docRequest.id })  // Get files for docRequest.
      // This object could have files for docrequests in other LoanApps
      const files = allDocumentRequestFilesList.filter((file) => file.documentRequest === docRequest.id)

      files.forEach(async function(file) {
        const filename = `${docRequest.name}/${file.name}.${file.fileExtension}`
        try {
          const zipfile = await JSZipUtils.getBinaryContent(file.fileUrl)
          zip.file(filename, zipfile, { binary: true })
          count++
          // Download zip once the async download calls above have been done.
          if (count === totCount) {
            zip.generateAsync({ type: 'blob' }).then(function(content) {
              saveAs(content, zipFilename)
              setLoading(false)
              setDone(true)
            })
          }
        } catch (err) {
          console.error(err)
        }
      })
    })
  }

  return { loading, handleClick }
}

export default useDownloadAll
