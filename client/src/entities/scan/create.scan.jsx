import {
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  BooleanInput,
  DateInput,
} from "react-admin";

// ------------------------------------------------

export default function CreateScan(props) {
  return (
    <Create>
      <SimpleForm redirect="list">
        <NumberInput variant="outlined" source="id" />
        <NumberInput variant="outlined" source="invitationId" />

        <NumberInput variant="outlined" source="deviceId" />
      </SimpleForm>
    </Create>
  );
}
