import {Tooltip, UnstyledButton} from "@mantine/core";
import {Link} from 'react-router-dom';
import useStyles from "./useStyle";


const NavbarLink = ({icon: Icon, label, active, to})=>{
  const { classes, cx } = useStyles();

  return (
    <Tooltip label={label} position="right" transitionDuration={0}>
      <UnstyledButton to={to} component={Link} className={cx(classes.link, { [classes.active]: active })}>
        <Icon stroke={1} />
      </UnstyledButton>
    </Tooltip>
  );
}
export default NavbarLink;
