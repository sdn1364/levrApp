import { Navbar, Stack, ActionIcon } from '@mantine/core'
import NavbarLink from './components/NavbarLink'
import { useLocation } from 'react-router-dom'
import useSidebar from './useSidebar'
import { IconArrowBarLeft, IconArrowBarRight } from '@tabler/icons'
import { useDispatch, useSelector } from 'react-redux'
import { selectSidebarStat, toggleSidebar } from 'redux/reducer/SidebarSlice'

const Sidebar = () => {
  const location = useLocation()
  const { navLinks, isActive } = useSidebar()
  const dispatch = useDispatch()
  const sideBarState = useSelector(selectSidebarStat)
  return (
    <Navbar width={{ base: sideBarState ? 210 : 60, height: '100%' }} p="sm">

      <Navbar.Section component={Stack} spacing="md" pt={35} sx={{ position: 'relative' }}>
        <ActionIcon onClick={() => dispatch(toggleSidebar())} radius={100} variant="default" size="md" sx={{ position: 'absolute', top: 0, left: '100%' }}>
          {
            sideBarState ? <IconArrowBarLeft size={14} /> : <IconArrowBarRight size={14} />
          }

        </ActionIcon>
        {
          navLinks.map((link, index) => {
            return <NavbarLink
              {...link}
              key={link.label}
              active={isActive(link.to, location.pathname)}
              to={link.to}
            />
          })
        }
      </Navbar.Section>

    </Navbar>
  )
}
export default Sidebar