import {useParams} from "react-router-dom";
import {useGetLoanAppUsersAndInvitesQuery} from "redux/reducer/loanApplication/loanApplicationApiSlice";
import {ManageAccess} from "components";
import {usePermission} from "hooks";

const ManageAccessTab = ()=>{

  const {id} = useParams();
  const {data:rolesAndInvite, isSuccess} = useGetLoanAppUsersAndInvitesQuery(id);
  const {getAvailableRolesForLoanApplication} = usePermission({loanAppId: id});


return <ManageAccess
  title="Manage Loan Application Roles"
  rolesAndInvites={rolesAndInvite}
  availableRoles={getAvailableRolesForLoanApplication()}
  handleDeleteInvitation={handleDeleteInvitation}
  handleDeleteUserRole={handleDeleteUserRole}
/>
}
export default ManageAccessTab;