import {
  Edit,
  SimpleForm,
  TextInput,
  BooleanInput,
  SelectInput,
  usePermissions,
  ImageInput,
  ImageField,
} from "react-admin";
import UserTitle from "./title";

// ------------------------------------------------

export default function EditUser(props) {
  const { isLoading, permissions } = usePermissions();
  return (
    <Edit title={<UserTitle />}>
      {isLoading ? (
        <h3>Loading</h3>
      ) : (
        <SimpleForm redirect="list">
          {/*<NumberInput variant="outlined" source="id" />*/}
          <TextInput variant="outlined" source="email" />
          <TextInput variant="outlined" source="name" />
          {/*<TextInput variant="outlined" source="password" />*/}
          <BooleanInput name={"active"} source={"active"} />
          <ImageInput source="photoUrl" label="new logo" accept="image/*">
            <ImageField source="src" title="title" />
          </ImageInput>
          <p>old logo</p>
          <ImageField
            source="photoUrl"
            title="title"
            label={"old image"}
            displayName={"old image"}
          />
          <TextInput variant="outlined" source="phone" />
          <TextInput variant="outlined" source="docs" />
          <SelectInput
            required
            name={"type"}
            source={"type"}
            choices={
              permissions === "SuperAdmin"
                ? [
                    { id: "SuperAdmin", name: "SuperAdmin" },
                    { id: "Admin", name: "Admin" },
                    { id: "Resident", name: "Resident" },
                    { id: "Security", name: "Security" },
                  ]
                : [
                    { id: "Resident", name: "Resident" },
                    { id: "Security", name: "Security" },
                  ]
            }
          />
        </SimpleForm>
      )}
    </Edit>
  );
}
