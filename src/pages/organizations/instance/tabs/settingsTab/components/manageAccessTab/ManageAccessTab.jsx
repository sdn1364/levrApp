import { ManageAccess } from 'components'
import useManageAccessTab from './useManageAccessTab'
import { LoadingOverlay } from '@mantine/core'

const ManageAccessTab = () => {

  const { isSuccess, isLoading, rolesAndInvites, getAvailableRolesForOrganization, handleDeleteInvitation, handleDeleteUserRole, handleSendInvitation, handleEditInvitation } = useManageAccessTab()

  if (isLoading) {
    return <LoadingOverlay visible />
  }

  return isSuccess && <ManageAccess
    title="Manage Organization Roles"
    rolesAndInvites={rolesAndInvites}
    availableRoles={getAvailableRolesForOrganization()}
    handleDeleteInvitation={handleDeleteInvitation}
    handleDeleteUserRole={handleDeleteUserRole}
    sendInvitation={handleSendInvitation}
    handleEditInvitation={handleEditInvitation}
  />
}
export default ManageAccessTab
