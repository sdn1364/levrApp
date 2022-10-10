import { useDispatch } from 'react-redux'
import { useGetAllOrganizationsQuery } from 'redux/reducer/organizations/organizationsApiSlice'
import { setOpenNewOrganizationModal } from 'redux/reducer/organizations/organizationsSlice'


const useOrganizationList = () => {

  const { data: organizations, isSuccess, isLoading } = useGetAllOrganizationsQuery()


  const dispatch = useDispatch()


  const openNewOrganizationModal = () => {
    dispatch(setOpenNewOrganizationModal())
  }


  return { organizations, isSuccess, isLoading, openNewOrganizationModal }
}
export default useOrganizationList
