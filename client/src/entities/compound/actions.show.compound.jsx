import { useState } from "react";
import {
  AutocompleteInput,
  EditButton,
  ImageField,
  ImageInput,
  NumberInput,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  TextInput,
  TopToolbar,
  useCreateController,
  useRefresh,
  useTranslate,
} from "react-admin";
import Button from "@mui/material/Button";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import Dialog from "@mui/material/Dialog";
import SaveToolbar from "../../components/SaveToolbar";

const CompoundShowActions = () => {
  const t = useTranslate();
  const [{ open, type }, setOpen] = useState({ open: false, type: undefined });
  const refresh = useRefresh();
  const { save: saveUser } = useCreateController({
    resource: "userCompound",
    redirect: false,
  });
  const { save: saveAnnouncement } = useCreateController({
    resource: "announcement/create",
    redirect: false,
  });
  const submitHandler = (values) => {
    if (type !== "user") {
      const { id: compoundId, title, description, photoUrl } = values;
      return saveAnnouncement(
        { compoundId, title, description, photoUrl },
        {
          onSuccess: () => {
            setOpen((p) => ({
              ...p,
              open: false,
            }));
            refresh();
          },
        }
      );
    }
    const {
      id: compoundId,
      userId,
      streetName,
      blockNumber,
      unitNumber,
    } = values;
    console.log(values);
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
          setOpen((p) => ({
            ...p,
            open: false,
          }));
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
          setOpen({ type: "user", open: true });
        }}
        startIcon={<PersonAddAlt1Icon />}
      >
        &nbsp;{t("add")} {t("property").replace("ال", "")}
      </Button>
      <Button
        size="small"
        color="primary"
        onClick={() => {
          setOpen({ type: "announcement", open: true });
        }}
        startIcon={<AnnouncementIcon />}
      >
        &nbsp;{t("add")} {t("announcement").replace("ال", "")}
      </Button>
      <Dialog
        onClose={() =>
          setOpen((p) => ({
            ...p,
            open: false,
          }))
        }
        open={open}
      >
        <div>
          {type === "user" ? (
            <SimpleForm
              onSubmit={submitHandler}
              toolbar={<SaveToolbar />}
              resource={"userCompound"}
            >
              <ReferenceInput
                required
                label="user"
                source="userId"
                reference="user"
              >
                <AutocompleteInput
                  label="user"
                  required
                  validate={(v) => {
                    if (v === "") return t("requiredUser");
                    return undefined;
                  }}
                />
              </ReferenceInput>
              <TextInput variant="outlined" source="streetName" required />
              <NumberInput variant="outlined" source={"blockNumber"} required />
              <NumberInput variant="outlined" source={"unitNumber"} required />
            </SimpleForm>
          ) : (
            <SimpleForm
              onSubmit={submitHandler}
              toolbar={<SaveToolbar />}
              resource={"announcement/create"}
            >
              <TextInput variant="outlined" source="title" />
              <TextInput
                variant="outlined"
                source="description"
                multiline={true}
              />
              <ImageInput source="photoUrl" accept="image/*">
                <ImageField source="src" title="title" />
              </ImageInput>
            </SimpleForm>
          )}
        </div>
      </Dialog>
    </TopToolbar>
  );
};
export default CompoundShowActions;
