import { ManageAccess } from 'components'
import useManageAccessTab from './useManageAccessTab'
import { LoadingOverlay } from '@mantine/core'

const ManageAccessTab = () => {

  const { isSuccess, isLoading, rolesAndInvites, getAvailableRolesForOrganization, handleDeleteInvitation, handleDeleteUserRole, handleSendInvitation, handleEditInvitation, handleResendInvitation } = useManageAccessTab()

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
    setUserRole={(value) => console.log('set user role hit', value)}

  />
}
export default ManageAccessTab
