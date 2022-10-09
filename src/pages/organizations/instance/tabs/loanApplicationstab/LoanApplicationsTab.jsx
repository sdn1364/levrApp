import {Stack} from "@mantine/core";
import LoanApplicationRow from "../../../../loanApplications/list/components/LoanApplicationRow";
import {useGetOneOrganizationQuery} from "redux/reducer/organizations/organizationsApiSlice";
import {useParams} from "react-router-dom";

const LoanApplicationsTab = () => {
  const {id} = useParams();
  const {data: organization, isSuccess} = useGetOneOrganizationQuery(id);

  return isSuccess && <Stack>
    <Stack spacing="sm">
      {organization && organization?.loan_applications.map((la) => {
        return <LoanApplicationRow redacted key={la.id} la={la}/>
      })}
    </Stack>
  </Stack>


}
export default LoanApplicationsTab;