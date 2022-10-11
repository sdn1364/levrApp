import { Tabs, Text, Stack, Badge, Center } from '@mantine/core'
import { useNavigate, useParams } from 'react-router-dom'
import { IconCurrencyDollarCanadian } from '@tabler/icons'
import CurrencyFormat from 'react-currency-format'

import { useGetOneLoanApplicationQuery, useGetLoanAppThreadSummariesCountQuery } from 'redux/reducer/loanApplication/loanApplicationApiSlice'

import { Content, Heading, LoadingLoanApplication, PageTitle } from 'components'

import MessagesTab from './tabs/messagesTab/MessagesTab'
import DocumentRequestTab from './tabs/documentRequestTab/DocumentRequestTab'
import useLoanApplicationInstance from './useLoanApplicationInstance'
import { useDispatch } from 'react-redux'
import { setLoadingLoanApplication } from 'redux/reducer/loanApplication/loanApplicationSlice'
import { useEffect } from 'react'
import SettingsTab from './tabs/settingsTab/SettingsTab'


const LoanApplicationInstance = () => {

  const { id: loanAppId, tab } = useParams()
  const navigate = useNavigate()

  const defaultTab = 'documentRequest'

  const { data: loanApplication, isSuccess, isLoading: isLoadingLoanApp } = useGetOneLoanApplicationQuery(loanAppId)
  const { data: threadSummaries, isSuccess: threadSummariesSuccess, isLoading: isLoadingThreadSummaries } = useGetLoanAppThreadSummariesCountQuery(loanAppId)

  const dispatch = useDispatch()

  const { loadingLoanApplication } = useLoanApplicationInstance()

  const handleTabChange = (value) => {
    navigate(`/loan-applications/${loanAppId}/${value}`)
  }
  useEffect(() => {
    if (!isLoadingLoanApp) {
      dispatch(setLoadingLoanApplication(
        {
          step: 'Loading Loan Application',
          percent: {
            loanApp: 1
          }
        }
      ))
    }
    if (!isLoadingThreadSummaries) {
      dispatch(setLoadingLoanApplication(
        {
          step: 'Counting Your Messages',
          percent: {
            messages: 1
          }
        }
      ))
    }

  }, [dispatch, isLoadingLoanApp, isLoadingThreadSummaries])

  return isSuccess && <>
    {
      loadingLoanApplication && <LoadingLoanApplication />
    }

    <Tabs value={tab}
          keepMounted={false}
          defaultValue={defaultTab}
          variant="pills"
          onTabChange={handleTabChange}>
      <Heading style={{ paddingRight: tab === defaultTab ? 537 : 50 }
      } tabs={<Tabs.List>
        <Tabs.Tab value="documentRequest">Loan Applications</Tabs.Tab>
        <Tabs.Tab value="messages"
                  rightSection={
                    (threadSummariesSuccess && threadSummaries > 0) &&
                    <Badge
                      sx={{ width: 16, height: 16, pointerEvents: 'none' }}
                      variant="filled"
                      size="xs"
                      p={0}
                    >
                      {threadSummaries}
                    </Badge>
                  }
        >Messages</Tabs.Tab>
        <Tabs.Tab value="settings">Settings</Tabs.Tab>

      </Tabs.List>}>
        <PageTitle hasBack to="/loan-applications">{isSuccess ? loanApplication.loan_description : null}</PageTitle>
        <Stack spacing="xs">
          <Center inline>
            <Text size="xs">Requested Amount:</Text>
            <IconCurrencyDollarCanadian size={16} /><CurrencyFormat value={isSuccess && loanApplication.requested_amount} displayType={'text'} thousandSeparator={true} />
          </Center>
        </Stack>
      </Heading>

      <Tabs.Panel value="documentRequest">
        <DocumentRequestTab />
      </Tabs.Panel>
      <Content>
        <Tabs.Panel value="messages">
          <MessagesTab />
        </Tabs.Panel>
        <Tabs.Panel value="settings">
          <SettingsTab />
        </Tabs.Panel>
      </Content>
    </Tabs>
  </>
}
export default LoanApplicationInstance
