import { selectNewLoanApplicationModal, setCloseNewLoanApplicationModal } from 'redux/reducer/loanApplication/loanApplicationSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { useGetAllOrganizationsQuery } from '../../../../../redux/reducer/organizations/organizationsApiSlice'

const useNewLoanApplicationModal = () => {
  const dispatch = useDispatch()
  const [active, setActive] = useState(0)
  const { data, isSuccess } = useGetAllOrganizationsQuery()

  const nextStep = () => setActive((current) => (current < 2 ? current + 1 : current))
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current))

  const opened = useSelector(selectNewLoanApplicationModal)
  const closeNewLoanApplicationModal = () => {
    dispatch(setCloseNewLoanApplicationModal())
  }

  const allOrganizations = () => {
    const organizations = []
    if (isSuccess) {

      data.map(val => {
        organizations.push({ value: val.id, label: val.name })
      })
    }

    return organizations
  }


  return {
    opened, active, setActive,
    nextStep,
    prevStep,
    closeNewLoanApplicationModal,
    allOrganizations

  }
}
export default useNewLoanApplicationModal
