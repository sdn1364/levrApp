import { ManageAccess } from 'components'
import { LoadingOverlay } from '@mantine/core'
import useManageAccessTab from './useManageAccessTab'

const ManageAccessTab = () => {
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
    module="loan application"

  />
}
export default ManageAccessTab
