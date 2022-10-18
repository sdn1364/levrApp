import useStyles from './useStyles'
import { Text, Group, Radio } from '@mantine/core'
import { UserAvatar } from 'components'

const UserRadio = ({
                     title,
                     className,
                     userId,
                     val,
                     ...others
                   }) => {
  const { classes, cx } = useStyles()

  return (

    <Radio
      className={cx(classes.button, className)}

      value={val}
      tabIndex={-1}
      size="sm"
      onChange={() => {
      }}
      mr="xl"
      radius="xs"
      styles={{ input: { cursor: 'pointer' } }}
      label={<Group sx={{ width: '100%' }} position="apart">
        <Group>
          <UserAvatar size="sm" userId={parseInt(userId)} />
          <Text size="sm">
            {title}
          </Text>
        </Group>
      </Group>}
    />
  )
}

export default UserRadio
