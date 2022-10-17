import { useGetUserQuery } from 'redux/reducer/auth/authApiSlice'
import {
  ROLE_ORG_OWNER,
  ROLE_ORG_MEMBER,
  ROLE_LOANAPP_BROKER,
  ROLE_LOANAPP_BORROWER,
  ROLE_LOANAPP_LENDER,
  ROLE_LOANAPP_VIEWER
} from 'roles'

const usePermission_old = ({ loanAppId, documentRequest, borrowerOrganizationId, organizationId }) => {

  const { data: user, isSuccess } = useGetUserQuery()

  const canStartNewLoanAsBroker = () => {
    if (isSuccess) {
      return (
        user.permissions.Organization.ROLE_ORG_MEMBER.length > 0 ||
        user.permissions.Organization.ROLE_ORG_OWNER.length > 0
      )
    }
  }

  const canDeleteLoanApplication = () => {
    if (isSuccess) {
      if (user.is_staff) return true
      if (user.is_superuser) return true
      if (user.permissions.LoanApplication.ROLE_LOANAPP_BROKER.includes(loanAppId)) return true
    }
  }

  const canManageDocRequests = () => {
    if (isSuccess) {
      if (user.is_staff) return true
      if (user.is_superuser) return true
      if (user.permissions.LoanApplication.ROLE_LOANAPP_BORROWER.includes(loanAppId)) return false
      if (user.permissions.LoanApplication.ROLE_LOANAPP_BROKER.includes(loanAppId)) return true
      if (user.permissions.LoanApplication.ROLE_LOANAPP_LENDER.includes(loanAppId)) return true
    }
    return false
  }

  const canManageDocRequestFiles = () => {
    if (isSuccess) {
      if (user.is_staff) return true
      if (user.is_superuser) return true
      if (canManageDocRequests({ user, loanAppId })) return true
      if (documentRequest.assignedToUser === user.id) return true
      const isLaBorrower = user.permissions.LoanApplication.ROLE_LOANAPP_BORROWER.includes(loanAppId)
      const isBorrowerOwner = user.permissions.Organization.ROLE_ORG_OWNER.includes(borrowerOrganizationId)
      if (isLaBorrower || isBorrowerOwner) {
        if (documentRequest.assignedToUser === null) return true
      }
      if (user.permissions.DocumentRequest.ROLE_DOCREQUEST_EDITOR.includes(documentRequest.id)) return true
    }
    return false
  }

  const canManageOrgRolesAndInvites = () => {
    if (isSuccess) {
      if (user.is_staff) return true
      if (user.is_superuser) return true
      if (user.permissions.Organization.ROLE_ORG_OWNER.includes(organizationId)) return true
    }

    return false
  }

  const canManageDocRequestRolesAndInvites = () => {
    if (isSuccess) {
      if (!documentRequest) return false
      if (user.is_staff) return true
      if (user.is_superuser) return true

      // DocRequest Editors may manage access, Viewers may not
      if (user.permissions.DocumentRequest.ROLE_DOCREQUEST_VIEWER.includes(documentRequest.id)) return false
      if (user.permissions.DocumentRequest.ROLE_DOCREQUEST_EDITOR.includes(documentRequest.id)) return true

      // users can manage access on doc requests that they own
      if (documentRequest.assignedToUser === user.id) return true
      // Org owners can manage access on unowned doc requests
      if (user.permissions.Organization.ROLE_ORG_OWNER.includes(borrowerOrganizationId)) {
        if (documentRequest.assignedToUser === null) return true
      }

      // LoanApp borrowers may invite on unknown doc requests only
      if (user.permissions.LoanApplication.ROLE_LOANAPP_BORROWER.includes(documentRequest.loanApplication)) {
        if (documentRequest.assignedToUser === null) return true
      }
      // loan brokers and lenders can manage access on all doc requests
      if (user.permissions.LoanApplication.ROLE_LOANAPP_BROKER.includes(documentRequest.loanApplication)) return true
      if (user.permissions.LoanApplication.ROLE_LOANAPP_LENDER.includes(documentRequest.loanApplication)) return true

    }
    return false
  }

  const canManageLoanApplicationRolesAndInvites = () => {
    if (isSuccess) {
      if (user.is_staff) return true
      if (user.is_superuser) return true
      if (user.permissions.LoanApplication.ROLE_LOAN_APP_BORROWER.includes(loanAppId)) return true
      if (user.permissions.LoanApplication.ROLE_LOAN_APP_BROKER.includes(loanAppId)) return true
      if (user.permissions.LoanApplication.ROLE_LOAN_APP_LENDER.includes(loanAppId)) return true

      // A bit loose, but actually changing things is controlled by backend, and assumed this user can see this
      //    page only if they have Org<=>LoanApp association already.
      if (user.permissions.Organization.ROLE_ORG_OWNER.length) return true

    }
    return false
  }

  const getAvailableRolesForLoanApplication = () => {
    if (isSuccess) {
      const loanApp = user.permissions.LoanApplication
      if (user.is_staff)
        return [
          ROLE_LOANAPP_VIEWER,
          ROLE_LOANAPP_BORROWER,
          ROLE_LOANAPP_BROKER,
          ROLE_LOANAPP_LENDER
        ]
      if (user.is_superuser)
        return [
          ROLE_LOANAPP_VIEWER,
          ROLE_LOANAPP_BORROWER,
          ROLE_LOANAPP_BROKER,
          ROLE_LOANAPP_LENDER
        ]
      // TODO LV-82 Borrower to be able to invite broker/lender if they are in a broker/lender Org
      if (loanApp.ROLE_LOANAPP_BORROWER.includes(loanAppId)) return [ROLE_LOANAPP_BORROWER]
      if (loanApp.ROLE_LOANAPP_BROKER.includes(loanAppId)) return [ROLE_LOANAPP_BORROWER, ROLE_LOANAPP_BROKER, ROLE_LOANAPP_LENDER]
      if (loanApp.ROLE_LOANAPP_LENDER.includes(loanAppId)) return [ROLE_LOANAPP_BORROWER, ROLE_LOANAPP_LENDER, ROLE_LOANAPP_BROKER]

    }
    return []
  }

  const getAvailableRolesForOrganization = () => {
    let id
    if (typeof organizationId !== 'number') {
      id = parseInt(organizationId)
    }
    if (isSuccess) {
      if (user === null) return false
      if (user.is_staff) return [ROLE_ORG_OWNER, ROLE_ORG_MEMBER]
      if (user.permissions.Organization.ROLE_ORG_OWNER.includes(id)) return [ROLE_ORG_OWNER, ROLE_ORG_MEMBER]
    }
    return []
  }

  const canEditLoanDescriptionAndAmount = () => {
    if (isSuccess) {
      if (user.is_staff) return true
      if (user.is_superuser) return true

      if (user.permissions.LoanApplication.ROLELOAN_APP_BORROWER.includes(loanAppId)) return false
      if (user.permissions.LoanApplication.ROLELOAN_APP_BROKER.includes(loanAppId)) return true
      if (user.permissions.LoanApplication.ROLELOAN_APP_LENDER.includes(loanAppId)) return true

    }
    return false
  }

  const hasAccessToOrganizationAsMember = (id) => {
    if (isSuccess) {
      if (user.is_staff) return true
      if (user.is_superuser) return true
      if (organizationId) {
        return user.permissions.Organization.ROLE_ORG_MEMBER.includes(organizationId)
      } else {
        return user.permissions.Organization.ROLE_ORG_MEMBER.includes(id)
      }
    }
    return false
  }

  const hasAccessToOrganizationAsOwner = (id) => {
    if (isSuccess) {
      if (user.is_staff) return true
      if (user.is_superuser) return true
      if (organizationId) {
        return user.permissions.Organization.ROLE_ORG_OWNER.includes(organizationId)
      } else {
        return user.permissions.Organization.ROLE_ORG_OWNER.includes(id)
      }
    }
    return false
  }

  const hasAccessToOrganization = (id) => {
    if (isSuccess) {
      if (user.is_staff) return true
      if (user.is_superuser) return true
      if (hasAccessToOrganizationAsMember(id) || hasAccessToOrganizationAsOwner(id)) return true
    }
    return false
  }

  return {
    canStartNewLoanAsBroker,
    canDeleteLoanApplication,
    canManageDocRequests,
    canManageDocRequestFiles,
    canManageOrgRolesAndInvites,
    canManageDocRequestRolesAndInvites,
    canManageLoanApplicationRolesAndInvites,
    getAvailableRolesForLoanApplication,
    getAvailableRolesForOrganization,
    canEditLoanDescriptionAndAmount,
    hasAccessToOrganizationAsMember,
    hasAccessToOrganizationAsOwner,
    hasAccessToOrganization
  }

}
export default usePermission_old
