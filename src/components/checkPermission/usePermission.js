import { useGetUserQuery } from '../../redux/reducer/auth/authApiSlice'
import { roles } from 'roles'
import { useParams } from 'react-router-dom'

const usePermission = (module, moduleId) => {

  const { id: paramId } = useParams()

  let id

  if (moduleId) {
    id = moduleId
  } else {
    id = paramId
  }

  const { data: user, isSuccess } = useGetUserQuery()

  const userIsStaff = () => {
    if (isSuccess) {
      return user.is_staff
    }
    return false
  }
  const userIsOrganizationOwner = () => {
    if (isSuccess) {
      if (user.permissions.Organization.ROLE_ORG_OWNER.includes(parseInt(id))) return true
    }
    return false
  }

  const userIsOrganizationMember = () => {
    if (isSuccess) {
      if (user.permissions.Organization.ROLE_ORG_MEMBER.includes(parseInt(id))) return true
    }
    return false

  }
  const userIsLoanAppBroker = () => {
    if (isSuccess) {
      if (user.permissions.LoanApplication.ROLE_LOANAPP_BROKER.includes(parseInt(id))) return true
    }
    return false
  }
  const userIsLoanAppBorrower = () => {
    if (isSuccess) {
      if (user.permissions.LoanApplication.ROLE_LOANAPP_BORROWER.includes(parseInt(id))) return true
    }
    return false
  }
  const userIsLoanAppLender = () => {
    if (isSuccess) {
      if (user.permissions.LoanApplication.ROLE_LOANAPP_LENDER.includes(parseInt(id))) return true
    }
    return false
  }
  const userIsLoanAppViewer = () => {
  }

  const userHasPermission = (can) => {
    if (userIsStaff()) {
      return true
    }
    switch (module) {
      case 'organization':
        if (userIsOrganizationOwner()) {
          return roles['organization owner'].includes(can)
        }
        if (userIsOrganizationMember()) {
          return roles['organization member'].includes(can)
        }
        break
      case 'loan application':

        if (userIsLoanAppBorrower()) {
          return roles['loan application borrower'].includes(can)
        }
        if (userIsLoanAppBroker()) {
          return roles['loan application broker'].includes(can)
        }
        if (userIsLoanAppLender()) {
          return roles['loan application lender'].includes(can)
        }
        break
      default:
        return false
    }

  }

  return { userHasPermission }
}

export default usePermission
