import { useEffect, useRef } from 'react'
import RailzConnect from '@railzai/railz-connect'
import { usePermission } from 'hooks'
import { RenderIfElse } from 'utilities'
import { Text } from '@mantine/core'

const Integrations = ({ organization }) => {

  const ref = useRef()
  const widget = new RailzConnect()
  const { hasAccessToOrganizationAsOwner } = usePermission({ organizationId: organization.id })
  useEffect(() => {

    if (organization) {
      widget.mount({
        parentElement: ref.current,
        endpoint: 'https://auth.railz.ai',
        widgetId: 'sb_prod_70b151af-f0ca-48bf-b54f-933bc6591a51', // TODO switch between staging and production widget IDs
        businessName: organization.name
        // Aadditional aramaters: https://docs.railz.ai/docs/railz-connect-parameters
      })

    }
    //return () => widget.unmount()
  }, [organization])

  return (
    <RenderIfElse isTrue={hasAccessToOrganizationAsOwner()} isFalse={<Text>You do not Permission to view This Tab</Text>}>
      <div id="railz-connect" ref={ref}></div>
    </RenderIfElse>
  )
}
export default Integrations
