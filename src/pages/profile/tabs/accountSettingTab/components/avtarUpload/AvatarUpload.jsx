import { FileButton, Group, Button, UnstyledButton, Box, Center } from '@mantine/core'
import { UserAvatar } from 'components'
import useAvatarUpload from './useAvatarUpload'
import { IconCamera, IconUpload } from '@tabler/icons'
import { useHover } from '@mantine/hooks'

function Text(props) {
  return null
}

const AvatarUpload = ({ userId }) => {

  const { handleUploadAvatar, resetRef, clearFile, file, handleFinishUploadAvatar } = useAvatarUpload(userId)

  const { hovered, ref } = useHover()

  return (
    <Group position="apart">
      <Group>
        <FileButton variant="light" size="xs" resetRef={resetRef} onChange={handleUploadAvatar} accept="image/png,image/jpeg">

          {(props) => <>

            <UnstyledButton {...props} sx={{ position: 'relative' }} ref={ref}>
              <Box sx={{ position: 'absolute', display: hovered ? 'flex' : 'none', background: 'black', zIndex: 10, opacity: 0.5, width: '100%', height: '100%', borderRadius: 120 }}>
                <Center sx={{ width: '100%', height: '100%' }}>
                  <IconCamera color="white" size={30} stroke={2} />
                </Center>
              </Box>
              <UserAvatar size={120} radius={120} userId={userId} src={file && file} />
            </UnstyledButton>
          </>}
        </FileButton>
        <Button variant="light" size="xs" disabled={!file} color="red" onClick={clearFile}>Reset</Button>
        {
          file ? <Text size="sm" mt="sm">
            Picked file: {file.name}
          </Text> : null
        }
      </Group>
      <Button variant="subtle" size="sm" leftIcon={<IconUpload size={18} />} onClick={handleFinishUploadAvatar}>Upload Image</Button>

    </Group>
  )
}
export default AvatarUpload