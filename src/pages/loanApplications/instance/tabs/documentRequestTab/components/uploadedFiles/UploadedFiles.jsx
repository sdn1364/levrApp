import { Table, Text, Center, ActionIcon, Group, Button, Stack } from "@mantine/core";
import { IconDownload, IconUpload, IconJpg, IconTrash } from "@tabler/icons";
import People from "../documentRequestRow/components/People";
import { TimeAgo } from "components";
import { useGetDocReqFilesQuery } from "redux/reducer/loanApplication/docRequestApiSlice";
import { HumanFileSize } from "utilities";

const UploadedFiles = ({ docReqId }) => {


  const { data: docReqFiles, isSuccess } = useGetDocReqFilesQuery(docReqId);


  return (isSuccess && docReqFiles.length > 0) ? <Table>
    <thead>
    <tr>
      <th style={{ flex: 1 }}>File name</th>
      <th style={{ textAlign: "center", width: 100 }}>File size</th>
      <th style={{ textAlign: "center", width: 100 }}>Uploaded by</th>
      <th style={{ textAlign: "center", width: 180 }}>Upload time</th>
      <th style={{ textAlign: "center", width: 100 }}></th>
    </tr>
    </thead>

    <tbody>
    {
      docReqFiles.map(({ created_by, created_by_email, file_size, upload_time, name, file_extension }, index) => (
        <tr key={index}>
          <td><Center inline>{(file_extension === "jpg" || file_extension === "jpeg") && <IconJpg size={18} />}<Text ml="xs">{name}</Text></Center></td>
          <td><Center>{HumanFileSize(file_size)}</Center></td>
          <td><Center>
            <People userName={created_by_email} userId={created_by} />
          </Center>
          </td>
          <td><Center><TimeAgo timestamp={upload_time} /></Center></td>
          <td>
            <Group>
              <ActionIcon color="purple"><IconDownload size={18} /></ActionIcon>
              <ActionIcon color="red"><IconTrash size={18} /></ActionIcon>
            </Group>
          </td>
        </tr>
      ))
    }
    </tbody>
  </Table> : <Stack>

    <Text align="center">It feels lonely here upload your first document</Text>
    <Center>
      <Button leftIcon={<IconUpload size={18} />}>Upload Document</Button>
    </Center>
  </Stack>;
};
export default UploadedFiles;