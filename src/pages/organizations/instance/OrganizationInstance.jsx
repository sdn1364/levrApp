import { Fragment } from 'react'

import {useGetOrganizationQuery} from "redux/reducer/organizations/organizationsApiSlice";
import {useParams} from "react-router-dom";
import LoanApplicationRow from "../../loanApplications/list/LoanApplicationRow";

const UseOrganizationInstance = ()=>{
  const {id} = useParams()
  const {data: organization, isLoading, isSuccess, isError, error} = useGetOrganizationQuery(id);
  const tabs = [
    'Loan Applications',
    'Add Ons',
    'Settings'
  ]
  const settingTabs = [
    'Organization Settings',
    'Manage Access'
  ]

  return <>

    <div>
      {/*<Tab.Group defaultIndex={0}>
        <Tab.List className="space-x-5">
          {
            tabs.map((tab,index)=>(
              <Tab className="ui-selected:bg-primary-500 ui-selected:text-white ui-not-selected:text-black rounded px-2 py-1
                hover:bg-gray-200
              " key={index}>{tab}</Tab>
            ))
          }
        </Tab.List>
        <Tab.Panels className="pt-10">
          <Tab.Panel className="space-y-3 pt-5">
           {
              isSuccess &&  organization.loan_applications.map((la)=>{
                return <LoanApplicationRow key={la.id} la={la}/>
              })
            }
          </Tab.Panel>
          <Tab.Panel>add on page</Tab.Panel>
          <Tab.Panel>
            <Tab.Group defaultIndex={0}>
              <div className="flex flex-row space-x-5">
                <Tab.List className="flex flex-col bg-white shadow rounded p-5 w-1/4 space-y-3">
                  {
                    settingTabs.map((tab, index)=>(
                      <Tab as={Fragment} key={index}>
                        {
                          ({selected})=>(
                            <Button className={`flex items-center ${selected ? 'bg-gray-200': ''}`} align="left" full>{tab}</Button>
                          )
                        }
                      </Tab>
                    ))
                  }
                </Tab.List>
                <Tab.Panels className="w-3/4">
                  <Tab.Panel className="space-y-3">
                    <Title h6>Organizations Settings</Title>
                    <Text>You can update organizations settings in here</Text>
                    <div className="flex flex-col flex-1 bg-white shadow rounded p-5 w-full space-y-3">

                    </div>
                  </Tab.Panel>
                  <Tab.Panel className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Title h6>Manage Organization Roles</Title>
                      <Button primary size="sm">Invite User</Button>
                    </div>
                    <div className="flex flex-col flex-1 bg-white shadow rounded p-5 w-full space-y-3">
                    </div>
                  </Tab.Panel>
                </Tab.Panels>
              </div>
            </Tab.Group>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>*/}
    </div>
    </>
}
export default UseOrganizationInstance;