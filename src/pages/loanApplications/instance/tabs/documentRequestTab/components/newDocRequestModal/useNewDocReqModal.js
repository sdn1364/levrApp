import { useParams } from 'react-router-dom'
import { useGetAllDocReqGuidePacksQuery, useGetDocRequestGuideQuery } from 'redux/reducer/loanApplication/docRequestApiSlice'
import { useGetLoanAppUsersAndInvitesQuery } from 'redux/reducer/loanApplication/loanApplicationApiSlice'
import { useDispatch, useSelector } from 'react-redux'
import { closeAddDocRequestModal, openAddDocReqModal, selectNewDocRequestModal } from 'redux/reducer/loanApplication/docRequestSlice'
import { useEffect, useState } from 'react'
import { useListState } from '@mantine/hooks'

const useNewDocReqModal = () => {

  const { id } = useParams()
  const dispatch = useDispatch()

  const { data: guidePacks, isSuccess: guidePacksIsSuccess } = useGetAllDocReqGuidePacksQuery()
  const { data: guides, isSuccess: guidesIsSuccess } = useGetDocRequestGuideQuery()


  const opened = useSelector(selectNewDocRequestModal)

  const guidePackData = () => {
    let packArray = []

    if (guidePacksIsSuccess) {
      // eslint-disable-next-line array-callback-return
      guidePacks.map(({ id, name }) => {
        packArray.push({ value: id, label: name })
      })
    }
    return packArray
  }

  const [selected, selectedHandlers] = useListState([])

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
        selectedHandlers.append(guidesData, [])
      }
    },
    [guidesIsSuccess])

  const handleSetSelected = (value) => {
    selectedHandlers.setState(value)
  }

  const handleChangePack = (values) => {
    if (guidePacksIsSuccess) {
      // eslint-disable-next-line array-callback-return
      values.map(value => {
        let guidePack = guidePacks.filter(g => values.includes(g.id))
        changeTransferListSelection(guidePack[0].document_request_guides)
      })
    }
  }

  const changeTransferListSelection = (guides) => {
    let guidesRefined = guides.map(guide => ({ value: `${guide.id}`, label: guide.name }))

    let unSelectedGuides = selected[0]
    let selectedGuides = selected[1]

    let newSelectedGuides = []

    // eslint-disable-next-line array-callback-return
    guides.map(guide => {
      if (selectedGuides.indexOf({ value: `${guide.id}`, label: guide.name }) === -1) {
        newSelectedGuides.push({ value: `${guide.id}`, label: guide.name })
      }
    })

    let newUnSelectedGuides = unSelectedGuides.filter(item => {
      return !guidesRefined.some(guide => {
        return guide.value === item.value
      })
    })

    selectedHandlers.setState([newUnSelectedGuides, newSelectedGuides])

  }

  // other functions in new doc request modal
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
      selectedHandlers.setState([guidesData, []])
    }
  }

  const shouldShowPersonSelect = (selectedDocumentRequestGuides) => {

    if (selected[1]) {
      for (let slctd of selected[1]) {
        if ((Object.values(guides || {})).filter((guide) => guide.id === parseInt(slctd.value))[0].document_parent_type === 'U')
          return true
      }
      return false
    }

  }

  return {
    selected, opened,
    handleChangePack,
    handleSetSelected,
    guidePackData,
    handleCloseNewDocRequestModal,
    handleOpenNewDocRequestModal,
    shouldShowPersonSelect
  }
}
export default useNewDocReqModal
