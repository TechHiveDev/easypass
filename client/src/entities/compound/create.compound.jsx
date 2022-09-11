import {
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  BooleanInput,
  DateInput,
} from "react-admin";

// ------------------------------------------------

export default function CreateCompound(props) {
  return (
    <Create>
      <SimpleForm redirect="list">
        <NumberInput variant="outlined" source="id" />
        <TextInput variant="outlined" source="name" />
        <TextInput variant="outlined" source="logoUrl" />
        <TextInput variant="outlined" source="location" />
      </SimpleForm>
    </Create>
  );
}
