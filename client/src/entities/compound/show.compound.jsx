import {
  Show,
  SimpleShowLayout,
  TextField,
  NumberField,
  BooleanField,
  DateField,
} from "react-admin";
import CompoundTitle from "./title";

// ------------------------------------------------

export default function ShowCompound(props) {
  return (
    <Show title={<CompoundTitle />}>
      <SimpleShowLayout>
        <NumberField variant="outlined" source="id" />
        <TextField variant="outlined" source="name" />
        <TextField variant="outlined" source="logoUrl" />
        <TextField variant="outlined" source="location" />
      </SimpleShowLayout>
    </Show>
  );
}
