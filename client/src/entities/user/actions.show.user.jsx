import { useState } from "react";
import {
  EditButton,
  NumberInput,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  TextInput,
  TopToolbar,
  useCreateController,
  useRefresh,
} from "react-admin";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import HomeIcon from "@mui/icons-material/Home";
import SaveToolbar from "../../utils/SaveToolbar";
const UserShowActions = () => {
  const [open, setOpen] = useState(false);
  const refresh = useRefresh();
  const { save: saveUser } = useCreateController({
    resource: "userCompound",
    redirect: false,
  });
  const submitHandler = (values) => {
    const {
      compoundId,
      id: userId,
      streetName,
      blockNumber,
      unitNumber,
    } = values;
    saveUser(
      {
        compoundId,
        userId,
        streetName,
        blockNumber,
        unitNumber,
      },
      {
        onSuccess: () => {
          setOpen(false);
          refresh();
        },
      }
    );
  };
  return (
    <TopToolbar>
      <EditButton />
      {/* Add your custom actions */}
      <Button
        size="small"
        color="primary"
        onClick={() => {
          setOpen(true);
        }}
        startIcon={<HomeIcon />}
      >
        Compound
      </Button>
      <Dialog onClose={() => setOpen(false)} open={open}>
        <div>
          <SimpleForm onSubmit={submitHandler} toolbar={<SaveToolbar />}>
            <ReferenceInput
              required
              source="compoundId"
              reference="compound"
              label={"compound"}
              name={"compoundId"}
            >
              <SelectInput optionText={"name"} required />
            </ReferenceInput>
            <TextInput variant="outlined" source="streetName" required />
            <NumberInput variant="outlined" source={"blockNumber"} required />
            <NumberInput variant="outlined" source={"unitNumber"} required />
          </SimpleForm>
        </div>
      </Dialog>
    </TopToolbar>
  );
};
export default UserShowActions;
