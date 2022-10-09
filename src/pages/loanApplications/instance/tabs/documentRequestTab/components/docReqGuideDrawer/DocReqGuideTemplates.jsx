import { useGetAllRequestGuideTemplateQuery } from "redux/reducer/loanApplication/docRequestApiSlice";
import { Center, Group, Title, Stack, Paper, useMantineTheme, Text, ActionIcon } from "@mantine/core";
import { IconDownload, IconFileDescription, IconFileText } from "@tabler/icons";

const DocReqGuideTemplates = ({ docReqGuideId }) => {
  const theme = useMantineTheme();
  const { data: docReqTemplates, isSuccess } = useGetAllRequestGuideTemplateQuery(docReqGuideId);

  return isSuccess && <Paper p="sm" sx={{ backgroundColor: theme.colorScheme === "light" ? theme.colors["gray"][0] : theme.colors["gray"][9] }}>
    <Stack spacing="md">
      <Group position="apart">
        <Center> <IconFileDescription color={theme.colorScheme === "light" ? theme.colors["purple"][5] : theme.colors["purple"][3]} stroke={1.5} size={25} /> <Title ml="sm" order={5}>Available Templates:</Title></Center>
      </Group>
      <Stack spacing="xs">
        {
          docReqTemplates.map(({ file_extension, name }) => (
            <Group position="apart" p="md">
              <Group spacing="xs">
                {
                  file_extension === "pdf" && <IconFileText color={theme.colors["red"][5]} size={25} stroke={1} />
                }
                <Text size="sm">
                  {name}
                </Text>
              </Group>
              <ActionIcon color="purple"><IconDownload size={18} /></ActionIcon>
            </Group>
          ))
        }
      </Stack>
    </Stack>
  </Paper>;
};
export default DocReqGuideTemplates;