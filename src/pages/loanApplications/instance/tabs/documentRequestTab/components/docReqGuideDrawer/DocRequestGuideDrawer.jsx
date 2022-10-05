import {Paper, useMantineTheme, Stack, ScrollArea, Title, LoadingOverlay, Modal, TypographyStylesProvider, Text, Button, Divider, Group, Center} from "@mantine/core";
import {useSearchParams} from "react-router-dom";
import {useGetAllRequestGuideTemplateQuery, useGetOneDocRequestQuery} from "redux/reducer/loanApplication/docRequestApiSlice";
import {IconArrowBigLeftLine, IconExternalLink, IconFileInfo, IconPlus} from "@tabler/icons";
import {useState} from "react";

const DocRequestGuideDrawer = () => {
  const theme = useMantineTheme();

  let [searchParams] = useSearchParams();
  const [guideDetailModel, setGuideDetailModel] = useState(false);
  const docReqId = searchParams.get('documentRequestId')

  const {data: docReq, isSuccess, isLoading} = useGetOneDocRequestQuery(docReqId)
  const {data: docReqTemplate, isSuccess: docReqTemplateIsSuccess} = useGetAllRequestGuideTemplateQuery()

  const handleOpenGuideDetailModel = () => {
    setGuideDetailModel(true)
  }
  const handleCloseGuideDetailModel = () => {
    setGuideDetailModel(false)
  }

  return <Paper radius={0} sx={{
    position: 'fixed',
    right: 0,
    top: 0,
    height: '100%',
    width: 500,
    padding: '85px 15px 15px 15px',
    borderLeft: '1px solid ' + (theme.colorScheme === 'light' ? theme.colors['gray'][2] : theme.colors['gray'][8])
  }}>

    <LoadingOverlay visible={isLoading}/>

    {
      isSuccess ? <>
        <Modal size="auto" opened={guideDetailModel} centered onClose={handleCloseGuideDetailModel}>
          <Stack spacing="xl">
            <ScrollArea p="xs" sx={{height: 500}} offsetScrollbars type="always">
              <TypographyStylesProvider>
                <div dangerouslySetInnerHTML={{__html: docReq.guide_text_details}}/>
              </TypographyStylesProvider>
            </ScrollArea>
            <Group>
              <Button onClick={handleCloseGuideDetailModel} variant="subtle">Close</Button>
            </Group>
          </Stack>
        </Modal>
        <Stack>
          <Title order={3}>{docReq.name}</Title>
          <Text size="sm" color="dimmed">Description</Text>
          <ScrollArea type="always" p="xs" style={{borderRadius: 5, height: 350, background: theme.colorScheme === 'light' ? theme.colors['gray'][1] : theme.colors['gray'][9]}} offsetScrollbars>
            <TypographyStylesProvider>
              <div dangerouslySetInnerHTML={{__html: docReq.guide_text_summary}}/>
            </TypographyStylesProvider>
          </ScrollArea>
          <Button variant="subtle" onClick={handleOpenGuideDetailModel}><IconExternalLink size={20}/> Read More</Button>
          <Divider/>
          <Group position="apart">
            <Title order={5}><Center> <IconFileInfo color={theme.colors['purple'][5]} stroke={1.5} size={30}/> Required Documents</Center></Title>
            <Button variant="outline" leftIcon={<IconPlus size={18}/>}>Add</Button>
          </Group>
        </Stack>
      </> : <Center sx={{height: '100%'}}><Text><Center><IconArrowBigLeftLine/> Please Select a Document Request for more details</Center></Text></Center>
    }

  </Paper>
}
export default DocRequestGuideDrawer;
