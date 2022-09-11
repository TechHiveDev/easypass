import {
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  BooleanInput,
  DateInput,
} from "react-admin";

// ------------------------------------------------

export default function CreateInvitation(props) {
  return (
    <Create>
      <SimpleForm redirect="list">
        <NumberInput variant="outlined" source="id" />
        <TextInput variant="outlined" source="name" />

        <TextInput variant="outlined" source="type" />
        <TextInput variant="outlined" source="notes" />
        <NumberInput variant="outlined" source="compoundId" />

        <NumberInput variant="outlined" source="userId" />
      </SimpleForm>
    </Create>
  );
}
