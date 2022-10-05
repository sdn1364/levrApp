import {
  Accordion, Paper, ActionIcon, Menu, Group, Divider, Text, Box, Checkbox, ColorSwatch, useMantineTheme, Center, createStyles
} from "@mantine/core";
import {IconUpload, IconMessage, IconPaperclip, IconFileDescription, IconGripVertical} from '@tabler/icons';
import {useState} from "react";
import {useHover} from "@mantine/hooks";
import useDocRequestTab from "../tabs/DocumentRequestTab/useDocRequestTab";


const useStyles = createStyles((theme) => ({

  itemDragging: {
    boxShadow: theme.shadows.lg,
  },

}));




const DocumentRequestRow = ({docReq, innerRef, provided, snapshot}) => {

  const [opened, setOpened] = useState(false);
  const {hovered, ref} = useHover();
  const [checked, setChecked] = useState(false);
  const theme = useMantineTheme();
  const { classes, cx } = useStyles();

  const {handleSelectDocRequest, handleUnSelectDocRequest} = useDocRequestTab()

  const onDocRequestCheckboxCheck = (e) => {
    if (!checked) {
      handleSelectDocRequest(e.target.value)
      setChecked(true)

    } else {
      handleUnSelectDocRequest(e.target.value)

      setChecked(false)
    }
  }

  return <Accordion.Item {...provided.draggableProps}
                         {...provided.dragHandleProps}
                         ref={innerRef}
                         className={cx({ [classes.itemDragging]: snapshot.isDragging })}
                         value={`${docReq.id}`}>
    <Box ref={ref} sx={{
      marginLeft: hovered || checked ? -36 : 0
    }}>
      <Group>
        {(hovered || checked) && <Checkbox onChange={onDocRequestCheckboxCheck} value={docReq.id}/>}
        <Paper px="md" sx={{
          flex: 1, display: 'flex', alignItems: 'center', borderLeft: '5px solid ' + theme.colors[docReq.status][5]
        }}>
          <Menu position="bottom-start" shadow="md" width={120} opened={opened} onChange={setOpened}>
            <Menu.Target>
              <ActionIcon size="lg">
                <ColorSwatch size={14} color={theme.colors[docReq.status][5]} radius="sm"/>
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>Status Color</Menu.Label>
              <Menu.Item><Group><ColorSwatch size={14} color={theme.colors['gray'][5]} radius="sm"/> Gray</Group></Menu.Item>
              <Menu.Item><Group><ColorSwatch size={14} color={theme.colors['brand'][5]} radius="sm"/> Purple</Group></Menu.Item>
              <Menu.Item><Group><ColorSwatch size={14} color={theme.colors['blue'][5]} radius="sm"/> Blue</Group></Menu.Item>
              <Menu.Item><Group><ColorSwatch size={14} color={theme.colors['green'][5]} radius="sm"/> Green</Group></Menu.Item>
              <Menu.Item><Group><ColorSwatch size={14} color={theme.colors['yellow'][5]} radius="sm"/> Yellow</Group></Menu.Item>
              <Menu.Item><Group><ColorSwatch size={14} color={theme.colors['red'][5]} radius="sm"/> Red</Group></Menu.Item>
            </Menu.Dropdown>
          </Menu>
          <div {...provided.dragHandleProps}>
            <Center>
              <IconGripVertical size={18} stroke={1.5} />
            </Center>
          </div>
          <Accordion.Control>{docReq.name}</Accordion.Control>

          <Group grow mr="md" spacing="lg">
            <Text inline color='brand.5'>
              <IconPaperclip size={18}/>
            </Text>
            <Text inline color='brand.5'>
              <IconFileDescription size={18}/>
            </Text>
            <Divider orientation="vertical"/>
          </Group>
          <ActionIcon size="lg"><IconUpload size={16}/></ActionIcon>
          <ActionIcon size="lg"><IconMessage size={16}/></ActionIcon>
        </Paper>
      </Group>
    </Box>
    <Accordion.Panel sx={theme => ({
      borderLeft: '5px solid ' + theme.colors[docReq.status][5]
    })}>
      this is doc request panel
    </Accordion.Panel>

  </Accordion.Item>

}
export default DocumentRequestRow;