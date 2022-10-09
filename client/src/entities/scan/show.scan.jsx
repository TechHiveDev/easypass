import {
  Show,
  SimpleShowLayout,
  TextField,
  NumberField,
  ReferenceField,
} from "react-admin";
import DeviceTitle from "./title";

// ------------------------------------------------

export default function ShowScan(props) {
  return (
    <Show title={<DeviceTitle />}>
      <SimpleShowLayout>
        <NumberField variant="outlined" source="id" />
        <TextField variant="outlined" source="invitationId" />
        <TextField variant="outlined" source="deviceId" />
        <TextField variant="outlined" source="success" />
        <ReferenceField source="compoundId" reference="compound">
          <TextField source="name" />
        </ReferenceField>
        <TextField variant="outlined" source="type" />
        <TextField variant="outlined" source="createdAt" />
      </SimpleShowLayout>
    </Show>
  );
}
