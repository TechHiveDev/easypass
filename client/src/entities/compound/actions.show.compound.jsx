import { useState } from "react";
import {
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
} from "react-admin";
import Button from "@mui/material/Button";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import Dialog from "@mui/material/Dialog";
import SaveToolbar from "../../utils/SaveToolbar";

const initialState = { open: false, type: undefined };
const CompoundShowActions = () => {
  const [{ open, type }, setOpen] = useState(initialState);
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
            setOpen(initialState);
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
          setOpen(initialState);
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
        User
      </Button>
      <Button
        size="small"
        color="primary"
        onClick={() => {
          setOpen({ type: "announcement", open: true });
        }}
        startIcon={<AnnouncementIcon />}
      >
        Announcement
      </Button>
      <Dialog onClose={() => setOpen(initialState)} open={open}>
        <div>
          {type === "user" ? (
            <SimpleForm onSubmit={submitHandler} toolbar={<SaveToolbar />}>
              <ReferenceInput
                required
                source="userId"
                reference="user"
                label={"user"}
                name={"user"}
              >
                <SelectInput optionText={"name"} required />
              </ReferenceInput>
              <TextInput variant="outlined" source="streetName" required />
              <NumberInput variant="outlined" source={"blockNumber"} required />
              <NumberInput variant="outlined" source={"unitNumber"} required />
            </SimpleForm>
          ) : (
            <SimpleForm onSubmit={submitHandler} toolbar={<SaveToolbar />}>
              <TextInput variant="outlined" source="title" />
              <TextInput
                variant="outlined"
                source="description"
                multiline={true}
              />
              <ImageInput source="photoUrl" label="logo" accept="image/*">
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
