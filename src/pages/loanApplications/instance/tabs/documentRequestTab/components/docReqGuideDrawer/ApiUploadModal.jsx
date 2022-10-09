import { Button, Group, Modal, Select, Stack } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { CapitalizeFirstLetter } from "utilities";

import useDocReqGuideDrawer from "./useDocReqGuideDrawer";
import { useCreateNewApiDocumentUploadMutation, useGetDocReqGuideRailzParamsQuery } from "redux/reducer/loanApplication/docRequestApiSlice";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useSearchParams } from "react-router-dom";

const ApiUploadModal = ({ docReqGuideId }) => {

  let [searchParams, setSearchParams] = useSearchParams();
  const { handleCloseApiUploadModal, apiUploadModal } = useDocReqGuideDrawer();

  const { data: queryParams, isSuccess } = useGetDocReqGuideRailzParamsQuery(docReqGuideId);

  const [createNewApiDocUpload] = useCreateNewApiDocumentUploadMutation();

  const fixName = (str) => {
    return CapitalizeFirstLetter(str.replace("_", " "));
  };
  const refineSelectValue = (values) => {
    let value = [];
    values.map(val => {
      value.push({ value: `${val}`, label: CapitalizeFirstLetter(val) });
    });
    return value;
  };


  const form = useForm({});

  const submitUploadForm = async (values) => {
    await createNewApiDocUpload({
      reqDocId: searchParams.get("documentRequestId"),
      query_parameters: values
    }).unwrap()
      .then(res => showNotification({
        title: "Api document created successfully",
        color: "green"
      }))
      .catch(err => console.log(err));
  };

  return isSuccess && apiUploadModal && <Modal centered opened={apiUploadModal} onClose={handleCloseApiUploadModal} title="Api Upload">
    <form onSubmit={form.onSubmit(submitUploadForm)}>
      <Stack spacing="xl">

        {
          // eslint-disable-next-line array-callback-return
          Object.keys(queryParams).map((key, index) => (
            <div key={index}>
              {queryParams[key].type === "date" && <DatePicker  {...form.getInputProps(key)} placeholder="Pick date" label={fixName(key)} />}
              {queryParams[key].type === "select" && <Select {...form.getInputProps(key)} label={fixName(key)} data={refineSelectValue(queryParams[key].options)} />}
            </div>
          ))
        }

        <Group mt="lg" position="apart">
          <Button onClick={handleCloseApiUploadModal} variant="subtle">Cancel</Button>
          <Button type="submit">Upload</Button>
        </Group>
      </Stack>
    </form>

  </Modal>;
};
export default ApiUploadModal;