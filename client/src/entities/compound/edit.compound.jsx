import {
  Edit,
  ImageField,
  ImageInput,
  SimpleForm,
  TextInput,
} from "react-admin";
import CompoundTitle from "./title";

// ------------------------------------------------

export default function EditCompound(props) {
  return (
    <Edit title={<CompoundTitle />}>
      <SimpleForm redirect="list">
        <TextInput variant="outlined" source="name" />
        <ImageInput source="logoUrl" label="new logo" accept="image/*">
          <ImageField source="src" title="title" />
        </ImageInput>
        <p>old logo</p>
        <ImageField
          source="logoUrl"
          title="title"
          label={"old image"}
          displayName={"old image"}
        />
        <TextInput variant="outlined" source="location" />
      </SimpleForm>
    </Edit>
  );
}
