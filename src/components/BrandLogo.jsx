import { Center, Image } from '@mantine/core'
import Logo from '../assets/download.jpeg'

const BrandLogo = ({ size }) => {
  return <Center>
    <Image radius="md" width={size} src={Logo} alt="" />
  </Center>

}
export default BrandLogo