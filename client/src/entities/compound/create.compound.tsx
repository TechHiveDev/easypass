import {
  Create,
  SimpleForm,
  TextInput,
  ImageInput,
  ImageField,
} from "react-admin";

// ------------------------------------------------

export default function CreateCompound(props: any) {
  return (
    <Create>
      <SimpleForm>
        <TextInput variant="outlined" source="name" />
        <ImageInput source="logoUrl" accept="image/*">
          <ImageField source="src" title="title" />
        </ImageInput>
        <TextInput variant="outlined" source="location" />
      </SimpleForm>
    </Create>
  );
}
