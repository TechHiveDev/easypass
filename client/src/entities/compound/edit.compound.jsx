import { Edit, SimpleForm, TextInput } from "react-admin";
import CompoundTitle from "./title";

// ------------------------------------------------

export default function EditCompound(props) {
  return (
    <Edit title={<CompoundTitle />}>
      <SimpleForm redirect="list">
        <TextInput variant="outlined" source="name" />
        <TextInput variant="outlined" source="logoUrl" />
        <TextInput variant="outlined" source="location" />
      </SimpleForm>
    </Edit>
  );
}
