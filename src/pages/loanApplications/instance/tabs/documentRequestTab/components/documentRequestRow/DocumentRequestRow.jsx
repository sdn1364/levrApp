import { Accordion, Paper, ActionIcon, Menu, Group, Divider, Text, Box, Checkbox, ColorSwatch, Stack, useMantineTheme, Center, createStyles, TextInput, Tooltip, Title, Popover } from "@mantine/core";
import { IconUpload, IconMessage, IconGripVertical, IconTrash, IconDotsVertical, IconNotes } from "@tabler/icons";
import { useState } from "react";
import { useClickOutside, useHover } from "@mantine/hooks";
import useDocRequestTab from "../../useDocRequestTab";
import { useParams } from "react-router-dom";
import { usePermission } from "hooks";
import { RenderIfElse, CapitalizeFirstLetter, RenderIf } from "utilities";
import { useGetOneLoanApplicationQuery } from "redux/reducer/loanApplication/loanApplicationApiSlice";
import RequiredFiles from "../requiredFiles/RequiredFiles";
import UploadDocsCounter from "./components/UploadDocsCounter";
import RequiredFilesCount from "./components/RequiredFilesCount";
import People from "./components/People";
import useDocumentRequestRow from "./useDocumentRequestRow";
import UploadedFiles from "../uploadedFiles/UploadedFiles";

const useStyles = createStyles((theme) => ({
  itemDragging: {
    boxShadow: theme.shadows.lg
  }
}));

const DocumentRequestRow = ({ docReq, innerRef, provided, snapshot }) => {
  const { id: loanAppId } = useParams();
  const [opened, setOpened] = useState(false);
  const { hovered, ref } = useHover();
  const [focused, setFocused] = useState(false);
  const theme = useMantineTheme();
  const { classes, cx } = useStyles();
  const { data: loanApplicationInstance } = useGetOneLoanApplicationQuery(loanAppId);
  const clickAwayRef = useClickOutside(() => setFocused(false));


  const { status, checked, handleChangeDocRequestStatus, onDocRequestCheckboxCheck, handleOpenDocReqDeleteConfirmModal } = useDocRequestTab();

  const { handleOpenFileUploadModal } = useDocumentRequestRow();

  const { canManageDocRequests, canManageDocRequestFiles } = usePermission({
    loanAppId,
    documentRequest: docReq,
    borrowerOrganizationId: loanApplicationInstance.borrower_org
  });

  return (
    <Accordion.Item {...provided.draggableProps} {...provided.dragHandleProps} ref={innerRef} className={cx({ [classes.itemDragging]: snapshot.isDragging })} value={`${docReq.id}`}>
      <Box ref={ref} sx={{ marginLeft: hovered || checked ? -36 : 0 }}>
        <Group>
          {(hovered || checked) && <Checkbox onChange={onDocRequestCheckboxCheck} value={docReq.id} />}
          <Paper px="md" sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            borderLeft: "5px solid " + theme.colors[docReq.status][5]
          }}>
            <RenderIfElse isTrue={canManageDocRequests()} isFalse={<ActionIcon variant="transparent" disabled size="lg">
              <ColorSwatch size={14} color={theme.colors[docReq.status][5]} radius="sm" />
            </ActionIcon>}>
              <Menu position="bottom-start" shadow="md" width={120} opened={opened} onChange={setOpened}>
                <Menu.Target>
                  <ActionIcon size="lg">
                    <ColorSwatch size={14} color={theme.colors[docReq.status][5]} radius="xs" />
                  </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Label>Status Color</Menu.Label>
                  {status.map((st, index) => (
                    <Menu.Item key={index} onClick={() => handleChangeDocRequestStatus(st.name, docReq.id)}>
                      <Group>
                        <ColorSwatch size={14} color={st.color} radius="xs" /> {CapitalizeFirstLetter(st.name)}
                      </Group>
                    </Menu.Item>
                  ))}
                </Menu.Dropdown>
              </Menu>
            </RenderIfElse>
            <div {...provided.dragHandleProps}>
              <Center>
                <IconGripVertical size={18} stroke={1.5} />
              </Center>
            </div>
            <Accordion.Control>
              <RenderIfElse isTrue={canManageDocRequests()} isFalse={docReq.name}>
                <TextInput ref={clickAwayRef} defaultValue={docReq.name} onFocus={setFocused} variant={focused ? "default" : "unstyled"} />
              </RenderIfElse>
            </Accordion.Control>

            <Group mr="xs" spacing="md" noWrap>
              <People userId={docReq.assigned_to_user}
                      userName={docReq.request_for_user_name} />
              <UploadDocsCounter count={docReq.upload_count} />
              <RequiredFilesCount docReqId={docReq.id} />
              <Divider orientation="vertical" />
            </Group>
            <RenderIf isTrue={canManageDocRequests()}>
              <Tooltip label="Upload to this document request">
                <ActionIcon color="purple" size="lg" onClick={() => handleOpenFileUploadModal(docReq.id)}>
                  <IconUpload size={16} />
                </ActionIcon>
              </Tooltip>
            </RenderIf>
            <Tooltip label="Click to discuss this document request">
              <ActionIcon color="purple" size="lg">
                <IconMessage size={16} />
              </ActionIcon>
            </Tooltip>
            <RenderIf isTrue={canManageDocRequests()}>
              <Menu shadow="md">
                <Menu.Target>
                  <ActionIcon size="lg">
                    <IconDotsVertical size={16} />
                  </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item color="red" icon={<IconTrash size={16} />} onClick={() => handleOpenDocReqDeleteConfirmModal(docReq)}>
                    Delete
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </RenderIf>
          </Paper>
        </Group>
      </Box>
      <Accordion.Panel sx={(theme) => ({ borderLeft: "5px solid " + theme.colors[docReq.status][5] })}>
        <Stack>
          <RenderIfElse isTrue={canManageDocRequestFiles()} isFalse={<Text align="center">You don not have permission to access these files</Text>}>
            <RequiredFiles docReq={docReq} />
          </RenderIfElse>
          <Paper p="sm" sx={{ backgroundColor: theme.colorScheme === "light" ? theme.colors["gray"][0] : theme.colors["gray"][9] }}>
            <Stack>
              <Group position="left">
                <Center><IconNotes color={theme.colors["purple"][5]} stroke={1.5} size={25} /><Title ml="sm" order={5}>Note</Title></Center>
              </Group>
              <RenderIfElse isTrue={canManageDocRequests()} isFalse={<Text>{docReq.note}</Text>}>
                <Text>{docReq.note}</Text>
              </RenderIfElse>
            </Stack>
          </Paper>
          <Paper p="sm" sx={{ backgroundColor: theme.colorScheme === "light" ? theme.colors["gray"][0] : theme.colors["gray"][9] }}>
            <UploadedFiles docReqId={docReq.id} />
          </Paper>
        </Stack>
      </Accordion.Panel>
    </Accordion.Item>
  );
};
export default DocumentRequestRow;
