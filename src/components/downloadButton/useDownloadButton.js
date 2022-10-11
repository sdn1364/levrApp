import { useState } from 'react'
import nanomemoize from 'nano-memoize'

async function _fetchBlob(url) {
  const response = await fetch(url)
  return response.blob()
}

const fetchBlob = nanomemoize(_fetchBlob)

const useDownloadButton = (url, fileName) => {
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const handleClick = () => {
    setLoading(true)
    /* Prompt the user to download the file at the given url*/
    // https://www.npmjs.com/package/nano-memoize
    fetchBlob(url).then(async (blob) => {
      const blobUrl = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = blobUrl
      link.setAttribute('download', fileName)
      link.click()
      setLoading(false)
      setDone(true)
    })
  }
  return { loading, done, handleClick }
}

export default useDownloadButton
