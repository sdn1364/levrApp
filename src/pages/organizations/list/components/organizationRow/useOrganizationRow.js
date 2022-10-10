import { RenderIf } from 'utilities'
import { IconBuilding, IconBuildingBank, IconBuildingWarehouse } from '@tabler/icons'

const useOrganizationRow = () => {

  const renderIcon = (org_type) => {
    return <>
      <RenderIf isTrue={org_type === 'ORG_LENDER'}>
        <IconBuildingBank stroke={1} />
      </RenderIf>
      <RenderIf isTrue={org_type === 'ORG_BORROWER'}>
        <IconBuildingWarehouse stroke={1} />
      </RenderIf>
      <RenderIf isTrue={org_type === 'ORG_BROKER'}>
        <IconBuilding stroke={1} />
      </RenderIf></>
  }
  return { renderIcon }
}
export default useOrganizationRow