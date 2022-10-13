import { removeInvitations, selectInvitations, setInvitations, updateInvitation } from '../../redux/reducer/ManageAccessSlice'
import { useDispatch, useSelector } from 'react-redux'
import { showNotification } from '@mantine/notifications'
import { useForm } from '@mantine/form'
import { READABLE_ROLE_MAPPING } from '../../roles'
import { useState } from 'react'

const useInviteUsers = (availableRoles) => {

  const dispatch = useDispatch()
  const invitations = useSelector(selectInvitations)


  const deleteInvitation = (invite) => {
    dispatch(removeInvitations(invite))
  }
  const addEmailToList = (value) => {
    // eslint-disable-next-line array-callback-return
    if (invitations.some(element => {
      if (element.email === value.email) return true
    })) {
      showNotification({
        title: 'Email already added',
        message: 'Please add new email address',
        color: 'red'
      })
    } else {
      dispatch(setInvitations({ email: value.email, role: availableRoles[0] }))
      form.reset()
    }
  }
  const form = useForm({
    initialValues: {
      email: ''
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email')
    }
  })

  let roles = []

  availableRoles.forEach((item) => {
    roles.push({ value: item, label: READABLE_ROLE_MAPPING[item] })
  })

  const changeRole = ({ role, email }) => {
    dispatch(updateInvitation({ email, role }))
    showNotification({
      title: 'Invited User Role changed'
    })
  }

  return { form, roles, deleteInvitation, addEmailToList, changeRole }
}

export default useInviteUsers
