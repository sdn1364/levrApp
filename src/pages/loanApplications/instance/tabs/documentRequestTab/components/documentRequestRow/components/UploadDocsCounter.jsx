import { Badge, Center, Text, Tooltip, useMantineTheme } from "@mantine/core";
import { IconPaperclip } from "@tabler/icons";

const UploadDocsCounter = ({ count }) => {
  const theme = useMantineTheme();
  return <Tooltip label="Number of documents that have been uploaded" withArrow color="purple">
    <Badge variant="transparent" sx={{ paddingLeft: 2, paddingRight: 2 }} color={count > 0 ? "purple" : "gray"} size="lg" radius="xs">
      <Text weight={700} color={count > 0 ? (theme.colorScheme === "light" ? "purple.5" : "purple.2") : theme.colorScheme === "light" ? "gray.6" : "gray.7"}>
        <Center>
          <IconPaperclip stroke={1} size={18} />
          {count}
        </Center>
      </Text>
    </Badge>
  </Tooltip>;

};
export default UploadDocsCounter;