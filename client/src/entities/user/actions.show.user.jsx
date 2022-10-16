import { useState } from "react";
import {
  AutocompleteInput,
  EditButton,
  NumberInput,
  ReferenceInput,
  SimpleForm,
  TextInput,
  TopToolbar,
  useCreateController,
  useRefresh,
  useTranslate,
} from "react-admin";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import HomeIcon from "@mui/icons-material/Home";
import SaveToolbar from "../../components/SaveToolbar";

const UserShowActions = () => {
  const t = useTranslate();
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
        &nbsp;{t("add")} {t("property").replace("ال", "")}
      </Button>
      <Dialog onClose={() => setOpen(false)} open={open}>
        <div>
          <SimpleForm
            onSubmit={submitHandler}
            toolbar={<SaveToolbar />}
            resource={"userCompound"}
          >
            <ReferenceInput
              required
              source="compoundId"
              reference="compound"
              label={"compound"}
              name={"compoundId"}
            >
              <AutocompleteInput
                label="compound"
                required
                validate={(v) => {
                  if (v === "") return t("requiredCompound");
                  return undefined;
                }}
              />
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
