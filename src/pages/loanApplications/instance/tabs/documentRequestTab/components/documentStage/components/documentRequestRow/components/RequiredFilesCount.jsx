import { Badge, Center, Text, Tooltip, useMantineTheme } from "@mantine/core";
import { IconFileInfo } from "@tabler/icons";
import { useGetDocReqRequiredFilesCountQuery } from "redux/reducer/loanApplication/docRequestApiSlice";

const RequiredFilesCount = ({ docReqId }) => {

  const theme = useMantineTheme();
  const { data: requiredFilesCount, isSuccess } = useGetDocReqRequiredFilesCountQuery(docReqId);


  return isSuccess && <Tooltip label="Number of Required files for this Document Request" withArrow color="purple">
    <Badge variant="transparent" sx={{ paddingLeft: 2, paddingRight: 2 }} color={requiredFilesCount > 0 ? "purple" : "gray"} size="lg" radius="xs">
      <Text weight={700} color={(requiredFilesCount > 0) ? (theme.colorScheme === "light" ? "purple.5" : "purple.2") : theme.colorScheme === "light" ? "gray.6" : "gray.7"}>
        <Center>
          <IconFileInfo stroke={1} size={18} />
          {requiredFilesCount}
        </Center>
      </Text>
    </Badge>
  </Tooltip>;
};
export default RequiredFilesCount;