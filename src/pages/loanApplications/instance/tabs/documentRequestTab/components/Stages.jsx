import { useParams } from 'react-router-dom'
import { IconDownload, IconMail } from '@tabler/icons'
import { Accordion, Button, Group, Box } from '@mantine/core'

import { DragDropContext } from 'react-beautiful-dnd'
import DocumentStage from './DocumentStage'
import { useState } from 'react'
import useDocRequestTab from '../useDocRequestTab'
import { useGetLoanApplicationStagesQuery } from 'redux/reducer/loanApplication/loanApplicationApiSlice'
import useLoanApplicationList from '../../../../list/useLoanApplicationList'
import useNewDocReq from './useNewDocReq'
import DownloadAllButton from './downloadAll/DownloadAllButton'

const Stages = () => {
  const { id } = useParams()
  const { data: loanAppStages, isSuccess } = useGetLoanApplicationStagesQuery(id)
  const [setAccordionValue] = useState([])
  const { openLoanApplicationReminderModal } = useLoanApplicationList()
  const { handleOnDragEnd, allTab } = useDocRequestTab()
  const { handleOpenNewDocRequestModal } = useNewDocReq()


  return isSuccess && <>
    <Group pt="lg" pr={537} position="right">
      <DownloadAllButton />
      <Button variant="outline" compact leftIcon={<IconMail size={18} />} onClick={() => openLoanApplicationReminderModal(id)} type="button">Send Message</Button>
      <Button compact onClick={handleOpenNewDocRequestModal}>New Document Request</Button>

    </Group>
    <Box sx={{ flex: 1, padding: '20px 520px 20px 50px' }}>
      <Accordion multiple variant="fill" chevronPosition="left" onChange={setAccordionValue} defaultValue={allTab(loanAppStages)}>
        <DragDropContext
          onDragEnd={handleOnDragEnd}>
          {
            loanAppStages.map((stage) => {
              return <DocumentStage key={`stage-${stage.id}`} stage={stage} />
            })
          }
        </DragDropContext>
      </Accordion>
    </Box>
  </>
}
export default Stages



