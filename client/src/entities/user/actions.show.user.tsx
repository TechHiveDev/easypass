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

// =================================================================

const UserShowActions = () => {
  const t = useTranslate();
  const [open, setOpen] = useState(false);
  const refresh = useRefresh();
  const { save: saveUser } = useCreateController({
    resource: "userCompound",
    redirect: false,
  });
  const submitHandler = (values: any) => {
    const {
      compoundId,
      id: userId,
      streetName,
      blockNumber,
      unitNumber,
    } = values;
    // @ts-ignore
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
            resource="userCompound"
          >
            <ReferenceInput
              source="compoundId"
              reference="compound"
              label="compound"
              name="compoundId"
              isRequired={true}
            >
              <AutocompleteInput
                optionText="name"
                label="compound"
                isRequired={true}
                validate={(v: any) => {
                  if (v === "") return t("isRequired={true}Compound");
                  return undefined;
                }}
              />
            </ReferenceInput>
            <TextInput
              variant="outlined"
              source="streetName"
              isRequired={true}
            />
            <NumberInput
              variant="outlined"
              source="blockNumber"
              isRequired={true}
            />
            <NumberInput
              variant="outlined"
              source="unitNumber"
              isRequired={true}
            />
          </SimpleForm>
        </div>
      </Dialog>
    </TopToolbar>
  );
};
export default UserShowActions;
