import { Popover, Avatar, Group, Stack, Text } from "@mantine/core";
import { UserAvatar } from "components";
import { useEffect, useState } from "react";

const People = ({ userId, userName }) => {

  const [color, setColor] = useState(null);

  const colors = ["red", "pink", "grape", "violet", "indigo", "blue", "teal", "cyan", "green", "lime", "yellow", "orange"];

  useEffect(() => {
    setColor(colors[Math.floor(Math.random() * colors.length)]);
  }, []);


  return (userName || userId) && <Popover position="bottom" withArrow shadow="md">
    <Popover.Target>
      <Avatar.Group>
        <UserAvatar size="md" radius={40} color={color} userId={userId}>{userName && userName}</UserAvatar>
      </Avatar.Group>
    </Popover.Target>
    <Popover.Dropdown>
      <Stack>
        <Group>
          <UserAvatar color={color} userId={userId}>{userName && userName}</UserAvatar>
          <Text size="sm">{userName}</Text>
        </Group>
      </Stack>
    </Popover.Dropdown>
  </Popover>;
};
export default People;