import {useDispatch} from "react-redux";
import {useCreateOrganizationMutation} from "redux/reducer/organizations/organizationsApiSlice";
import {showNotification} from "@mantine/notifications";


const useList = () => {

  const [setOrganization, {isLoading}] = useCreateOrganizationMutation();

  const dispatch = useDispatch();

  const createNewOrganization = async (data) => {
    console.log(data)
    await setOrganization(data).unwrap()
      .then(res => {
        showNotification({
          title: 'New Organization',
          message: 'New organization created',
          color: 'green'
        })
      })
      .catch(error => {
        if (error?.data?.name) {
          showNotification({
            title: 'Cannot Create new organization!',
            message: error.data.name,
            color: 'red'
          })
        }
      })
  }
  return {createNewOrganization}
}
export default useList;