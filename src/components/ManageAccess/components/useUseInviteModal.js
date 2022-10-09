import {useDeleteOrganizationMutation} from "redux/reducer/organizations/organizationsApiSlice";

const func = ()=>{

  const id = 1;



  const handleDeleteOrganization = ()=>{
    deleteOrganization(id)
  }
  return {handleDeleteOrganization}
}
export default func;