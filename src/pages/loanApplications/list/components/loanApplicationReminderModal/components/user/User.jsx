import useStyles from './useStyles'
import { useUncontrolled } from '@mantine/hooks'
import { Checkbox, UnstyledButton, Text, Group } from '@mantine/core'
import { UserAvatar } from 'components'

const User = ({
                checked,
                defaultChecked,
                onChange,
                title,
                description,
                className,
                userId,
                name,
                ...others
              }) => {
  const { classes, cx } = useStyles()

  const [value, handleChange] = useUncontrolled({
    value: checked,
    defaultValue: defaultChecked,
    finalValue: false,
    onChange
  })

  return (
    <UnstyledButton
      {...others}
      radius="md"
      onClick={() => handleChange(!value)}
      className={cx(classes.button, className)}
    >
      <Checkbox

        checked={value}
        tabIndex={-1}
        size="sm"
        onChange={onChange}
        mr="xl"
        radius="xs"
        name={name}
        styles={{ input: { cursor: 'pointer' } }}
        value={userId}
      />
      <Group sx={{ width: '100%' }} position="apart">
        <Group>
          <UserAvatar size="sm" userId={userId} />
          <Text size="sm">
            {title}
          </Text>
        </Group>
        <Text size="xs" color="dimmed">
          {description && description}
        </Text>
      </Group>
    </UnstyledButton>
  )
}

export default User
