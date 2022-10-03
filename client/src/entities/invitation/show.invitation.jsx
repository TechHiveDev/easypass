import {
  Show,
  SimpleShowLayout,
  TextField,
  NumberField,
  BooleanField,
  DateField,
  ReferenceField,
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
        <ReferenceField source="userId" reference="user">
          <TextField source="name" />
        </ReferenceField>
        <ReferenceField source="compoundId" reference="compound">
          <TextField source="name" />
        </ReferenceField>
      </SimpleShowLayout>
    </Show>
  );
}
