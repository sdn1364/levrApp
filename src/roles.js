// org roles
export const ROLE_ORG_OWNER = "ROLE_ORG_OWNER";
export const ROLE_ORG_MEMBER = "ROLE_ORG_MEMBER";

// Loan app roles
export const ROLE_LOANAPP_BROKER = "ROLE_LOANAPP_BROKER";
export const ROLE_LOANAPP_BORROWER = "ROLE_LOANAPP_BORROWER";
export const ROLE_LOANAPP_LENDER = "ROLE_LOANAPP_LENDER";
export const ROLE_LOANAPP_VIEWER = "ROLE_LOANAPP_VIEWER";
// doc request roles
export const ROLE_DOCREQUEST_EDITOR = "ROLE_DOCREQUEST_EDITOR";
export const ROLE_DOCREQUEST_VIEWER = "ROLE_DOCREQUEST_VIEWER";

export const READABLE_ROLE_MAPPING = {
  // ROLE_NAME_EXACTLY_AS_BACKEND: User friendly description

  // org roles
  [ROLE_ORG_OWNER]: "Owner",
  [ROLE_ORG_MEMBER]: "Member",

  // Loan app roles
  [ROLE_LOANAPP_BROKER]: "Broker",
  [ROLE_LOANAPP_BORROWER]: "Borrower",
  [ROLE_LOANAPP_LENDER]: "Lender",
  [ROLE_LOANAPP_VIEWER]: "Viewer",

  // DOC REQUEST
  [ROLE_DOCREQUEST_EDITOR]: "Editor",
  [ROLE_DOCREQUEST_VIEWER]: "Viewer",
};
