import { useEffect, useRef } from "react";
import RailzConnect from "@railzai/railz-connect";

const Integrations = ({ organizationName }) => {

  const ref = useRef();
  const widget = new RailzConnect();

  useEffect(() => {
    if (organizationName) {
      widget.mount({
        parentElement: ref.current,
        endpoint: "https://auth.railz.ai",
        widgetId: "sb_prod_70b151af-f0ca-48bf-b54f-933bc6591a51", // TODO switch between staging and production widget IDs
        businessName: organizationName
        // Aadditional aramaters: https://docs.railz.ai/docs/railz-connect-parameters
      });

    }
    //return () => widget.unmount();
  }, [organizationName]);

  return (
    <div id="railz-connect" ref={ref}></div>
  );
};
export default Integrations;