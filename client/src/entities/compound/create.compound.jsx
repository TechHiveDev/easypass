import { Create, SimpleForm, TextInput } from "react-admin";

// ------------------------------------------------

export default function CreateCompound(props) {
  return (
    <Create>
      <SimpleForm redirect="list">
        <TextInput variant="outlined" source="name" />
        <TextInput variant="outlined" source="logoUrl" />
        <TextInput variant="outlined" source="location" />
      </SimpleForm>
    </Create>
  );
}
