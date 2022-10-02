import {
  Show,
  SimpleShowLayout,
  TextField,
  NumberField,
  BooleanField,
  DateField,
} from "react-admin";
import InvitationTitle from "./title";

// ------------------------------------------------

export default function ShowInvitation(props) {
  return (
    <Show title={<InvitationTitle />}>
      <SimpleShowLayout>
        <NumberField variant="outlined" source="id" />
        <TextField variant="outlined" source="name" />

        <TextField variant="outlined" source="type" />
        <TextField variant="outlined" source="notes" />
        <NumberField variant="outlined" source="compoundId" />

        <NumberField variant="outlined" source="userId" />
      </SimpleShowLayout>
    </Show>
  );
}
