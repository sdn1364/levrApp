import { Button, Group, Modal, Stack, TextInput, Text, useMantineTheme } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { IconPhoto, IconUpload, IconX } from "@tabler/icons";
import * as PropTypes from "prop-types";
import { selectFileUploadModal } from "redux/reducer/loanApplication/docRequestSlice";
import { useSelector } from "react-redux";
import useDocumentRequestRow from "./documentRequestRow/useDocumentRequestRow";

Text.propTypes = {
  size: PropTypes.string,
  inline: PropTypes.bool,
  children: PropTypes.node
};
const FileUploadModal = () => {

  const theme = useMantineTheme();
  const opened = useSelector(selectFileUploadModal);
  const { handleCloseFileUploadModal } = useDocumentRequestRow();

  return <Modal opened={opened !== null} centered
                onClose={handleCloseFileUploadModal}
                title="Upload File for Document Request"
  >
    <Stack spacing="xl">
      <TextInput label="Name" placeholder="Type the name of the document" />
      <Dropzone onDrop={(files) => console.log("accepted files", files)}
                onReject={(files) => console.log("rejected files", files)}
                accept={IMAGE_MIME_TYPE}
      >
        <Group position="center" spacing="xl" style={{ minHeight: 220, pointerEvents: "none" }}>
          <Dropzone.Accept>
            <IconUpload
              size={50}
              stroke={1.5}
              color={theme.colors[theme.primaryColor][theme.colorScheme === "light" ? 4 : 6]}
            />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX
              size={50}
              stroke={1.5}
              color={theme.colors["red"][theme.colorScheme === "light" ? 4 : 6]}
            />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <IconPhoto size={50} stroke={1.5} />
          </Dropzone.Idle>

          <Stack spacing="xs">
            <Text align="center" inline>
              Drag images here or click to select files
            </Text>
            <Text size="sm" align="center" color="dimmed" inline mt={7}>
              Attach as many files as you like, each file should not exceed 5mb
            </Text>
          </Stack>
        </Group>
      </Dropzone>
      <Group position="apart">
        <Button variant="subtle" onClick={handleCloseFileUploadModal}>Cancel</Button>
        <Button>Upload</Button>
      </Group>
    </Stack>

  </Modal>;
};
export default FileUploadModal;