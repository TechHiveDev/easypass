import {
  Show,
  SimpleShowLayout,
  TextField,
  NumberField,
  ReferenceField,
} from "react-admin";
import DeviceTitle from "./title.device";

// ------------------------------------------------

export default function ShowDevice(props: any) {
  return (
    <Show title={<DeviceTitle />}>
      <SimpleShowLayout>
        <NumberField source="id" />
        <TextField source="ip" />
        <ReferenceField source="compoundId" reference="compound" link="show">
          <TextField source="name" />
        </ReferenceField>
      </SimpleShowLayout>
    </Show>
  );
}
