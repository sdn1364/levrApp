async function _fetchBlob(url) {
  const response = await fetch(url)
  return response.blob()
}

const fetchBlob = nanomemoize(_fetchBlob)
const useRequiredFiles = () => {
  const downloadFile = () => {

  }
}
export default useRequiredFiles
