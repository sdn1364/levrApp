import { Paper, useMantineTheme, Stack, ScrollArea, Title, LoadingOverlay, Modal, TypographyStylesProvider, Text, Button, Divider, Group, Center } from '@mantine/core'
import { useParams, useSearchParams } from 'react-router-dom'
import { useGetOneDocRequestQuery } from 'redux/reducer/loanApplication/docRequestApiSlice'
import { IconArrowBigLeftLine, IconExternalLink } from '@tabler/icons'
import { useState } from 'react'
import DocReqGuideTemplates from './DocReqGuideTemplates'
import { RenderIf } from 'utilities'
import RequiredFiles from '../requiredFiles/RequiredFiles'
import useDocReqGuideDrawer from './useDocReqGuideDrawer'
import ApiUploadModal from './ApiUploadModal'
import { useGetOneLoanApplicationQuery } from 'redux/reducer/loanApplication/loanApplicationApiSlice'

const DocRequestGuideDrawer = () => {
  const theme = useMantineTheme()

  const { id: loanAppId } = useParams()
  let [searchParams] = useSearchParams()
  const [guideDetailModal, setGuideDetailModal] = useState(false)
  const docReqId = searchParams.get('documentRequestId')
  const { handleOpenApiUploadModal } = useDocReqGuideDrawer()

  const { data: docReq, isSuccess, isLoading } = useGetOneDocRequestQuery(docReqId, { skip: docReqId === 'null' || docReqId === null })
  const { data: loanApplication, isSuccess: loanAppIsSuccess } = useGetOneLoanApplicationQuery(loanAppId)

  const handleOpenGuideDetailModel = () => {
    setGuideDetailModal(true)
  }
  const handleCloseGuideDetailModel = () => {
    setGuideDetailModal(false)
  }

  return (
    <Paper
      radius={0}
      sx={{
        position: 'fixed',
        right: 0,
        top: 0,
        height: '100%',
        width: 500,
        padding: '85px 15px 15px 15px',
        borderLeft: '1px solid ' + (theme.colorScheme === 'light' ? theme.colors['gray'][2] : theme.colors['gray'][8])
      }}>
      <LoadingOverlay visible={isLoading} />

      {isSuccess ? (
        <>
          <Modal size="auto" opened={guideDetailModal} centered onClose={handleCloseGuideDetailModel}>
            <Stack spacing="xl">
              <ScrollArea p="xs" sx={{ height: 500 }} offsetScrollbars type="always">
                <TypographyStylesProvider>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: docReq.guide_text_details
                    }}
                  />
                </TypographyStylesProvider>
              </ScrollArea>
              <Group>
                <Button onClick={handleCloseGuideDetailModel} variant="subtle">
                  Close
                </Button>
              </Group>
            </Stack>
          </Modal>
          <ApiUploadModal docReqGuideId={docReq.document_request_guide} />
          <Stack>
            <Title order={3}>{docReq.name}</Title>
            <Text size="sm" color="dimmed">
              Description
            </Text>
            <ScrollArea
              type="always"
              p="xs"
              style={{
                borderRadius: 5,
                height: 350,
                background: theme.colorScheme === 'light' ? theme.colors['gray'][1] : theme.colors['gray'][9]
              }}
              offsetScrollbars>
              <TypographyStylesProvider>
                <div
                  dangerouslySetInnerHTML={{
                    __html: docReq.guide_text_summary
                  }}
                />
              </TypographyStylesProvider>
            </ScrollArea>
            <Button variant="subtle" onClick={handleOpenGuideDetailModel}>
              <IconExternalLink size={20} /> Read More
            </Button>
            <RenderIf isTrue={docReq.contains_api_config && (loanAppIsSuccess && loanApplication.borrower_org)}>
              <Button type="button" onClick={handleOpenApiUploadModal}>Api Upload</Button>
            </RenderIf>
            <RequiredFiles docReq={docReq} />
            <DocReqGuideTemplates docReqGuideId={docReq.document_request_guide} />
          </Stack>
        </>
      ) : (
        <Center sx={{ height: '100%' }}>
          <IconArrowBigLeftLine />
          <Text ml="sm">Please Select a Document Request for more details</Text>
        </Center>
      )}
    </Paper>
  )
}
export default DocRequestGuideDrawer
