import {
  Create,
  SimpleForm,
  TextInput,
  ImageInput,
  ImageField,
} from "react-admin";

// ------------------------------------------------

export default function CreateCompound(props) {
  return (
    <Create>
      <SimpleForm redirect="list">
        <TextInput variant="outlined" source="name" />
        <ImageInput source="logoUrl" label="logo" accept="image/*">
          <ImageField source="src" title="title" />
        </ImageInput>
        <TextInput variant="outlined" source="location" />
      </SimpleForm>
    </Create>
  );
}
