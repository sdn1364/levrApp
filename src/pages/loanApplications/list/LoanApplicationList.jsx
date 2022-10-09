
import {useGetAllLoanApplicationsQuery} from "redux/reducer/loanApplication/loanApplicationApiSlice";
import LoanApplicationRow from "./components/LoanApplicationRow";
import {Stack, Title, Button} from "@mantine/core";
import {Content, Heading, PageTitle} from "components";

import NewLoanApplicationModal from "./components/NewLoanApplicationModal";
import LoanApplicationReminderModal from "./components/LoanApplicationReminderModal";

import useLoanApplicationList from "./useLoanApplicationList";
import {IconPlus} from "@tabler/icons";

const LoanApplicationList = () => {

  const {data: loanApplications, isSuccess,  } = useGetAllLoanApplicationsQuery();

  const {openNewLoanApplicationModal} = useLoanApplicationList();

  return isSuccess && <>
    <Heading>
      <PageTitle>All Loan Applications</PageTitle>
      <Button variant="primary" onClick={openNewLoanApplicationModal} leftIcon={<IconPlus size={18}/>}>New Loan Application</Button>
    </Heading>
    <Content>
      <Stack spacing="sm">
        { loanApplications.map((la)=>{
          return <LoanApplicationRow key={la.id} la={la}/>
        })}
      </Stack>
    </Content>
    <NewLoanApplicationModal />
    <LoanApplicationReminderModal/>
  </>
}
export default LoanApplicationList
