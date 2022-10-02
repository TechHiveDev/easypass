import {
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  BooleanInput,
  DateInput,
} from "react-admin";
import CompoundTitle from "./title";

// ------------------------------------------------

export default function EditCompound(props) {
  return (
    <Edit title={<CompoundTitle />}>
      <SimpleForm redirect="list">
        <NumberInput variant="outlined" source="id" />
        <TextInput variant="outlined" source="name" />
        <TextInput variant="outlined" source="logoUrl" />
        <TextInput variant="outlined" source="location" />
      </SimpleForm>
    </Edit>
  );
}
