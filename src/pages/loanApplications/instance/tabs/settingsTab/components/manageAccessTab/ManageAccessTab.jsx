import { ManageAccess } from 'components'
import { LoadingOverlay } from '@mantine/core'
import useManageAccessTab from './useManageAccessTab'
import { usePermission } from '../../../../../../../hooks'
import { useParams } from 'react-router-dom'

const ManageAccessTab = () => {
  const { id } = useParams()
  const {
    rolesAndInvite,
    isSuccess, isLoading,
    getAvailableRolesForLoanApplication,
    handleDeleteInvitation,
    handleDeleteUserRole,
    handleSendInvitation,
    handleEditInvitation,
    handleResendInvitation,
    handleSetUserRole,
    handleSetInvitationRole
  } = useManageAccessTab()
  const { canManageLoanApplicationRolesAndInvites } = usePermission({ loanAppId: parseInt(id) })

  if (isLoading) {
    return <LoadingOverlay visible />
  }

  return isSuccess && <ManageAccess
    title="Manage Loan Application Roles"
    rolesAndInvites={rolesAndInvite}
    availableRoles={getAvailableRolesForLoanApplication()}
    deleteInvitation={handleDeleteInvitation}
    deleteUserRole={handleDeleteUserRole}
    sendInvitation={handleSendInvitation}
    editInvitation={handleEditInvitation}
    resendInvitation={handleResendInvitation}
    setUserRole={handleSetUserRole}
    setInvitationRole={handleSetInvitationRole}
    isOwner={canManageLoanApplicationRolesAndInvites}
  />
}
export default ManageAccessTab
