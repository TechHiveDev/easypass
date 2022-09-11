import {
  Show,
  SimpleShowLayout,
  TextField,
  NumberField,
  BooleanField,
  DateField,
} from "react-admin";

// ------------------------------------------------

export default function ShowScan(props) {
  return (
    <Show>
      <SimpleShowLayout>
        <NumberField variant="outlined" source="id" />
        <NumberField variant="outlined" source="invitationId" />

        <NumberField variant="outlined" source="deviceId" />
      </SimpleShowLayout>
    </Show>
  );
}
