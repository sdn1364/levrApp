import {Avatar, UnstyledButton} from "@mantine/core";
import {useGetUserImageQuery} from "redux/reducer/auth/authApiSlice";

const UserAvatar = ({userId,src, size}, ref)=>{
  const {data:userImage, isSuccess} = useGetUserImageQuery(userId)
  return src
    ? <Avatar radius={size || 'xl'} size={size} src={src} alt="it's me" />
    : <Avatar radius={size || 'xl'} size={size} src={isSuccess && userImage.profile_image_url} alt="it's me" />

}

export default UserAvatar;
