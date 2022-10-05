import { useGetOrganizationsQuery} from "redux/reducer/organizations/organizationsApiSlice";
import OrganizationRow from "../components/OrganizationRow";

const OrganizatoinsList = () => {
  const { data: organizations, isLoading, isSuccess, isError,error} = useGetOrganizationsQuery();

  return <>

    <div >
      {isSuccess && organizations.map((org)=>(
          <OrganizationRow key={org.id} organization={org}/>
      ))}
    </div>

  </>
}
export default OrganizatoinsList;
