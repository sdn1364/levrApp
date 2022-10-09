import {FileButton, Group, Button,UnstyledButton} from "@mantine/core";
import {useRef, useState} from "react";
import {UserAvatar} from "components";

function Text(props) {
  return null;
}

const AvatarUpload = ({userId}) => {

  const [file, setFile] = useState();
  const resetRef = useRef(null);

  const clearFile = () => {
    setFile(null);
    resetRef.current?.();
  };

  const handleUploadAvatar = (value)=>{
    setFile(URL.createObjectURL(value))
  }

  return (
    <>
      <Group>

        <FileButton variant="light" size="xs" resetRef={resetRef} onChange={handleUploadAvatar} accept="image/png,image/jpeg">
          {(props) => <UnstyledButton {...props}><UserAvatar size={90} userId={userId} src={file && file}/></UnstyledButton>}
        </FileButton>
        <Button variant="light" size="xs" disabled={!file} color="red" onClick={clearFile}>Reset</Button>
        {
          file ?  <Text size="sm" mt="sm">
            Picked file: {file.name}
          </Text> : null
        }
      </Group>


    </>
  );
}
export default AvatarUpload;