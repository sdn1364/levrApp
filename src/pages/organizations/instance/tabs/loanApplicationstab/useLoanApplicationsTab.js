import { useParams } from 'react-router-dom'
import { useGetOneOrganizationQuery } from 'redux/reducer/organizations/organizationsApiSlice'

const useLoanApplicationsTab = () => {
  const { id } = useParams()
  const { data: organization, isSuccess, isLoading } = useGetOneOrganizationQuery(id)
  return { organization, isSuccess, isLoading }
}
export default useLoanApplicationsTab