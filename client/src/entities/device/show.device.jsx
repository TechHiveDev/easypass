import {
  Show,
  SimpleShowLayout,
  TextField,
  NumberField,
  BooleanField,
  DateField,
} from "react-admin";
import DeviceTitle from "./title";

// ------------------------------------------------

export default function ShowDevice(props) {
  return (
    <Show title={<DeviceTitle />}>
      <SimpleShowLayout>
        <NumberField variant="outlined" source="id" />
        <TextField variant="outlined" source="ip" />
        <NumberField variant="outlined" source="compoundId" />
      </SimpleShowLayout>
    </Show>
  );
}
