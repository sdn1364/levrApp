import { ManageAccess } from 'components'
import useManageAccessTab from './useManageAccessTab'
import { LoadingOverlay } from '@mantine/core'
import { useParams } from 'react-router-dom'

const ManageAccessTab = () => {
  const { id: organizationId } = useParams()

  const {
    isSuccess, isLoading, rolesAndInvites,
    getAvailableRolesForOrganization,
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
    title="Manage Organization Roles"
    rolesAndInvites={rolesAndInvites}
    availableRoles={getAvailableRolesForOrganization()}
    deleteInvitation={handleDeleteInvitation}
    deleteUserRole={handleDeleteUserRole}
    sendInvitation={handleSendInvitation}
    editInvitation={handleEditInvitation}
    resendInvitation={handleResendInvitation}
    setUserRole={handleSetUserRole}
    setInvitationRole={handleSetInvitationRole}
    module="organization"
  />
}
export default ManageAccessTab
