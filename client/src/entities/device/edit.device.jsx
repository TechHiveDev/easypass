import {
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  BooleanInput,
  DateInput,
} from "react-admin";
import DeviceTitle from "./title";

// ------------------------------------------------

export default function EditDevice(props) {
  return (
    <Edit title={<DeviceTitle />}>
      <SimpleForm redirect="list">
        <NumberInput variant="outlined" source="id" />
        <TextInput variant="outlined" source="ip" />
        <NumberInput variant="outlined" source="compoundId" />
      </SimpleForm>
    </Edit>
  );
}
