import { Group, Select, ActionIcon, Center } from '@mantine/core'
import { READABLE_ROLE_MAPPING } from 'roles'
import { useState } from 'react'
import { IconCheck, IconX } from '@tabler/icons'

const RoleSelect = ({ availableRole, value, onSave }) => {

  const [selected, setSelected] = useState('')
  let data = []
  availableRole.forEach((item) => {
    data.push({ value: item, label: READABLE_ROLE_MAPPING[item] })
  })
  return <Group px="sm" sx={{
    flexWrap: 'nowrap'
  }}>
    <Select defaultValue={value[0]} data={data} onChange={setSelected} variant="filled" />
    {
      selected ? <Center inline spacing="xs">
        <ActionIcon variant="subtle" color="green" onClick={() => onSave(selected)}><IconCheck size={16} /></ActionIcon>
        <ActionIcon variant="subtle" color="red" onClick={() => setSelected('')}><IconX size={16} /></ActionIcon>
      </Center> : null
    }
  </Group>
}
export default RoleSelect
