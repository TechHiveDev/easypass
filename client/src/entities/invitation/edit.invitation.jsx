import {
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  BooleanInput,
  DateInput,
} from "react-admin";
import InvitationTitle from "./title";

// ------------------------------------------------

export default function EditInvitation(props) {
  return (
    <Edit title={<InvitationTitle />}>
      <SimpleForm redirect="list">
        <NumberInput variant="outlined" source="id" />
        <TextInput variant="outlined" source="name" />

        <TextInput variant="outlined" source="type" />
        <TextInput variant="outlined" source="notes" />
        <NumberInput variant="outlined" source="compoundId" />

        <NumberInput variant="outlined" source="userId" />
      </SimpleForm>
    </Edit>
  );
}
