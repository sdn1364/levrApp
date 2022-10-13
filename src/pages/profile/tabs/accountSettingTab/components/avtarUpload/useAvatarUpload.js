import { useRef, useState } from 'react'
import { useUpdateUserImageMutation } from 'redux/reducer/auth/authApiSlice'
import { showNotification } from '@mantine/notifications'

const useAvatarUpload = (userId) => {
  const [file, setFile] = useState()
  const resetRef = useRef(null)
  const [updateUserImage] = useUpdateUserImageMutation()
  const clearFile = () => {
    setFile(null)
    resetRef.current?.()
  }
  const handleUploadAvatar = (value) => {
    setFile(URL.createObjectURL(value))
  }
  const handleFinishUploadAvatar = async () => {
    const formData = new FormData()
    formData.append('image', file)
    formData.append('name', `profile_image_${userId}`)
    await updateUserImage({ userId, formData }).unwrap()
      .then(res => showNotification({
        title: 'User image updated',
        color: 'green'
      })).catch(err => console.log(err))
  }

  return { handleUploadAvatar, resetRef, clearFile, file, handleFinishUploadAvatar }
}

export default useAvatarUpload
