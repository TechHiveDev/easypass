import {
  Show,
  SimpleShowLayout,
  TextField,
  NumberField,
  ReferenceField,
} from "react-admin";
import DeviceTitle from "./title.device";

// ------------------------------------------------

export default function ShowDevice(props) {
  return (
    <Show title={<DeviceTitle />}>
      <SimpleShowLayout>
        <NumberField variant="outlined" source="id" />
        <TextField variant="outlined" source="ip" />
        <ReferenceField source="compoundId" reference="compound" link="show">
          <TextField source="name" />
        </ReferenceField>
      </SimpleShowLayout>
    </Show>
  );
}
