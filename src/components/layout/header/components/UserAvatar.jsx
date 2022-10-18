import { Avatar } from '@mantine/core'
import { useGetUserImageQuery } from 'redux/reducer/auth/authApiSlice'

const UserAvatar = ({ userId, src, size, children, color, radius }, ref) => {

  const { data: userImage, isSuccess } = useGetUserImageQuery(userId, { skip: (userId === null || userId === 'null' || userId === undefined) })

  let name = children && children.substring(0, 2).toUpperCase()

  return src
    ? <Avatar radius={radius || 'xl'} size={size} src={src} alt="it's me" />
    : ((isSuccess && userImage.profile_image_url)
      ? <Avatar radius={radius || 'xl'} size={size} src={userImage.profile_image_url} alt="it's me" />
      : <Avatar radius={radius || 'xl'} color={color} size={size}>{name}</Avatar>)

}

export default UserAvatar
