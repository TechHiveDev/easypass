import {
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  BooleanInput,
  DateInput,
} from "react-admin";

// ------------------------------------------------

export default function EditScan(props) {
  return (
    <Edit>
      <SimpleForm redirect="list">
        <NumberInput variant="outlined" source="id" />
        <NumberInput variant="outlined" source="invitationId" />

        <NumberInput variant="outlined" source="deviceId" />
      </SimpleForm>
    </Edit>
  );
}
