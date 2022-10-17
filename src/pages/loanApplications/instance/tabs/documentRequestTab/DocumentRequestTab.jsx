import { Stack } from '@mantine/core'
import { useParams } from 'react-router-dom'

import DocumentRequestSelected from './components/DocumentRequestSelected'
import DocRequestGuideDrawer from './components/docReqGuideDrawer/DocRequestGuideDrawer'
import LoanApplicationReminderModal from '../../../list/components/loanApplicationReminderModal/LoanApplicationReminderModal'
import Stages from './components/stages/Stages'
import EmptyDocRequest from './components/EmptyDocRequest'
import ConfirmDeleteDocReqModal from './components/ConfirmDeleteDocReqModal'
import { useGetLoanAppDocRequestLengthQuery } from 'redux/reducer/loanApplication/docRequestApiSlice'
import FileUploadModal from './components/fileUploadModal/FileUploadModal'
import NewDocRequestModal from './components/newDocRequestModal/NewDocRequestModal'
import { useGetLoanAppUsersAndInvitesQuery } from 'redux/reducer/loanApplication/loanApplicationApiSlice'
import SendMessageModal from './components/sendMessageModal/SendMessageModal'

const DocumentRequestTab = () => {

  const { id } = useParams()

  const { data: loanAppLength, isSuccess } = useGetLoanAppDocRequestLengthQuery({ loanAppId: id })
  const { data: rolesAndInvitations, isSuccess: rolesIsSuccess } = useGetLoanAppUsersAndInvitesQuery(parseInt(id))

  return isSuccess && <>
    <DocumentRequestSelected />
    <LoanApplicationReminderModal />
    <ConfirmDeleteDocReqModal />
    <FileUploadModal />
    <SendMessageModal />
    <DocRequestGuideDrawer />

    <NewDocRequestModal existingBorrowers={rolesIsSuccess ? rolesAndInvitations.user_roles.filter((invt) => invt.roles.includes('ROLE_LOANAPP_BORROWER')) : []}
                        invitedBorrowers={rolesIsSuccess ? rolesAndInvitations.invitations.filter((invt) => invt.object_permissions.includes('ROLE_LOANAPP_BORROWER')) : []}
    />

    <Stack spacing={0}>
      {loanAppLength > 0 ? <Stages /> : <EmptyDocRequest />}
    </Stack>
  </>
}

export default DocumentRequestTab
