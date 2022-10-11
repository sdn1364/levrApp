import { Stack } from '@mantine/core'
import { useParams } from 'react-router-dom'

import DocumentRequestSelected from './components/DocumentRequestSelected'
import DocRequestGuideDrawer from './components/docReqGuideDrawer/DocRequestGuideDrawer'
import LoanApplicationReminderModal from '../../../list/components/loanApplicationReminderModal/LoanApplicationReminderModal'
import Stages from './components/Stages'
import EmptyDocRequest from './components/EmptyDocRequest'
import ConfirmDeleteDocReqModal from './components/ConfirmDeleteDocReqModal'
import { useGetLoanAppDocRequestLengthQuery } from 'redux/reducer/loanApplication/docRequestApiSlice'
import FileUploadModal from './components/FileUploadModal'
import NewDocRequestModal from './components/newDocRequestModal/NewDocRequestModal'


const DocumentRequestTab = () => {

  const { id } = useParams()

  const { data: loanAppLength, isSuccess } = useGetLoanAppDocRequestLengthQuery({ loanAppId: id })


  return isSuccess && <>
    <DocumentRequestSelected />
    <LoanApplicationReminderModal />
    <ConfirmDeleteDocReqModal />
    <FileUploadModal />
    <NewDocRequestModal />
    <Stack spacing={0}>
      {loanAppLength > 0 ? <Stages /> : <EmptyDocRequest />}
      <DocRequestGuideDrawer />
    </Stack>
  </>
}

export default DocumentRequestTab
