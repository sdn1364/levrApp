import {useMantineColorScheme,ActionIcon} from "@mantine/core";
import {IconMoonStars, IconSun} from "@tabler/icons";

const ToggleTheme = ()=>{
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  return <ActionIcon
    onClick={() => toggleColorScheme()}
    size="lg"
    sx={(theme) => ({
      backgroundColor:
        theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.colors.yellow[4] : theme.colors.blue[6],
    })}
  >
    {colorScheme === 'dark' ? <IconSun stroke={1} size={18} /> : <IconMoonStars stroke={1} size={18} />}
  </ActionIcon>
}
export default ToggleTheme;