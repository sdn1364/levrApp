import { ManageAccess } from 'components'
import { useGetOrganizationUserAndInvitesQuery } from 'redux/reducer/organizations/organizationsApiSlice'
import { useParams } from 'react-router-dom'
import { usePermission } from 'hooks'
import useManageAccessTab from './useManageAccessTab'

const ManageAccessTab = () => {

  const { id } = useParams()
  const { data: rolesAndInvites, isSuccess } = useGetOrganizationUserAndInvitesQuery(id)

  const { getAvailableRolesForOrganization } = usePermission({ loanAppId: id })

  const { handleDeleteInvitation, handleDeleteUserRole, handleSendInvitation, handleEditInvitation } = useManageAccessTab(id)

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
