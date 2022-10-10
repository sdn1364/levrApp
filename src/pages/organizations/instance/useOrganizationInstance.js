import { useNavigate, useParams } from 'react-router-dom'
import { useGetOneOrganizationQuery } from 'redux/reducer/organizations/organizationsApiSlice'

const useOrganizationInstance = () => {
  const { id, tab } = useParams()
  const navigate = useNavigate()
  const defaultTab = 'applications'
  const { data: organization, isSuccess, isLoading } = useGetOneOrganizationQuery(id)

  const handleTabChange = (value) => {
    navigate(`/organizations/${id}/${value}`)
  }
  return { handleTabChange, defaultTab, organization, isSuccess, isLoading, tab }
}

export default useOrganizationInstance