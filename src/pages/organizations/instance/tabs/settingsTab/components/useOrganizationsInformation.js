import {useUpdateOrganizationNameMutation, useUpdateOrganizationTypeMutation,useDeleteOrganizationMutation} from "redux/reducer/organizations/organizationsApiSlice";
import {showNotification} from "@mantine/notifications";
import {useNavigate} from "react-router-dom";


const useOrganizationsInformation = (id)=>{

  const [updateOrganizationName] = useUpdateOrganizationNameMutation();
  const [updateOrganizationType] = useUpdateOrganizationTypeMutation();
  const [deleteOrganization] = useDeleteOrganizationMutation();

  const navigation = useNavigate();

  const handleUpdateOrganizationName = async (data)=>{
    await updateOrganizationName({id, name: data.name}).unwrap()
      .then(res=>{
        showNotification({
          title: 'Organization Updated',
          message: 'Organization name updated',
          color: 'green'
        })
      }).catch(error => {
        if (error?.data?.name) {
          showNotification({
            title: 'Cannot Update organization!',
            message: error.data.name,
            color: 'red'
          })
        }
      })
  }

  const handleUpdateOrganizationType = async (data)=>{
    await updateOrganizationType({id, org_type: data.org_type}).unwrap()
      .then(res=>{
        showNotification({
          title: 'Organization updated',
          message: 'Organization type updated',
          color: 'green'
        })
      }).catch(error => {
        console.log(error)
      })
  }

  const handleDeleteOrganization = async ()=>{
    await deleteOrganization(id).unwrap()
      .then(res=> {

        navigation('/organizations')

      })
      .catch(error => console.log(error))
  }


  return {handleUpdateOrganizationName, handleUpdateOrganizationType,handleDeleteOrganization}
}

export default useOrganizationsInformation;