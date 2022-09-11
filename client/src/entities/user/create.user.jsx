import {
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  BooleanInput,
  DateInput,
} from "react-admin";

// ------------------------------------------------

export default function CreateUser(props) {
  return (
    <Create>
      <SimpleForm redirect="list">
        <NumberInput variant="outlined" source="id" />
        <TextInput variant="outlined" source="email" />
        <TextInput variant="outlined" source="name" />
        <TextInput variant="outlined" source="password" />
        <TextInput variant="outlined" source="photoUrl" />
        <TextInput variant="outlined" source="phone" />
      </SimpleForm>
    </Create>
  );
}
