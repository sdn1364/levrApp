import { useParams } from 'react-router-dom'
import { useGetAllDocReqGuidePacksQuery, useGetDocRequestGuideQuery } from 'redux/reducer/loanApplication/docRequestApiSlice'
import { useGetLoanAppUsersAndInvitesQuery } from 'redux/reducer/loanApplication/loanApplicationApiSlice'
import { useDispatch, useSelector } from 'react-redux'
import { closeAddDocRequestModal, openAddDocReqModal, selectNewDocRequestModal } from 'redux/reducer/loanApplication/docRequestSlice'
import { useEffect, useState } from 'react'

const useNewDocReq = () => {

  const { id } = useParams()
  const dispatch = useDispatch()

  const { data: guidePacks, isSuccess: guidePacksIsSuccess } = useGetAllDocReqGuidePacksQuery()
  const { data: guides, isSuccess: guidesIsSuccess } = useGetDocRequestGuideQuery()
  const { data: rolesAndInvitations, isSuccess: rolesIsSuccess } = useGetLoanAppUsersAndInvitesQuery(id)

  /*
      existingBorrowers: rolesIsSuccess && rolesAndInvitations.userRoles
        .filter((invt) => invt.roles.includes("ROLE_LOANAPP_BORROWER")),
      invitedBorrowers: rolesIsSuccess && rolesAndInvitations.invitations
        .filter((invt) => invt.objectPermissions.includes("ROLE_LOANAPP_BORROWER")),
  */

  const opened = useSelector(selectNewDocRequestModal)

  const guidePackData = () => {
    let packArray = []

    if (guidePacksIsSuccess) {
      // eslint-disable-next-line array-callback-return
      guidePacks.map((guidePack) => {
        packArray.push({ value: guidePack.id, label: guidePack.name })
      })
    }
    return packArray
  }

  const [selected, setSelected] = useState(null)

  useEffect(() => {
      let guidesData = []

      if (guidesIsSuccess) {
        // eslint-disable-next-line array-callback-return
        guides.map(guide => {
          guidesData.push({
            value: `${guide.id}`,
            label: guide.name
          })
        })
        setSelected([guidesData, []])
      }
    },
    [guidesIsSuccess])

  const handleSetSelected = (value) => {
    setSelected(value)
  }

  const handleChangePack = (values) => {

    if (guidePacksIsSuccess) {
      values.map(value => {
        let guidePack = guidePacks.filter(g => g.id === value)
        changeTransferListSelection(guidePack[0].document_request_guides)
      })
    }
  }
  const changeTransferListSelection = (guides) => {
    const guideRepository = selected[0]
    const selectedGuides = selected[1]
    let redactedRepository = []

    // eslint-disable-next-line array-callback-return
    guides.map(guide => {
      redactedRepository = guideRepository.filter(g => `${g.value}` === `${guide.id}`)
      if (selectedGuides.map((ug) => parseInt(ug.value)).indexOf(guide.id) === -1) {
        selectedGuides.push({ value: `${guide.id}`, label: guide.name })
      }
    })

    setSelected([redactedRepository, selectedGuides])
  }

  const handleOpenNewDocRequestModal = () => {
    dispatch(openAddDocReqModal())
  }

  const handleCloseNewDocRequestModal = () => {
    dispatch(closeAddDocRequestModal())
    let guidesData = []

    if (guidesIsSuccess) {
      // eslint-disable-next-line array-callback-return
      guides.map(guide => {
        guidesData.push({
          value: `${guide.id}`,
          label: guide.name
        })
      })
      setSelected([guidesData, []])
    }
  }

  const shouldShowPersonSelect = ({ documentRequestGuides, selectedDocumentRequestGuides }) => {
    for (let selected of selectedDocumentRequestGuides) {
      if ((Object.values(documentRequestGuides || {})).filter((guide) => guide.id === selected.id)[0].documentParentType === 'U')
        return true
    }
    return false
  }

  return {
    selected,
    handleChangePack,
    handleSetSelected,
    guidePackData,
    opened,
    handleCloseNewDocRequestModal,
    handleOpenNewDocRequestModal,
    shouldShowPersonSelect
  }
}
export default useNewDocReq
