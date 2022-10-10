import {
  Show,
  SimpleShowLayout,
  TextField,
  NumberField,
  BooleanField,
  DateField,
  ReferenceField,
} from "react-admin";
import DeviceTitle from "./title";

// ------------------------------------------------

export default function ShowDevice(props) {
  return (
    <Show title={<DeviceTitle />}>
      <SimpleShowLayout>
        <NumberField variant="outlined" source="id" />
        <TextField variant="outlined" source="ip" />
        <ReferenceField source="compoundId" reference="compound">
          <TextField source="name" />
        </ReferenceField>
      </SimpleShowLayout>
    </Show>
  );
}
