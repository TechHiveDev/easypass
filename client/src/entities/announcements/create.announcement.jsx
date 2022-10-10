import {
  Create,
  SimpleForm,
  TextInput,
  ReferenceInput,
  SelectInput,
  ImageInput,
  ImageField,
} from "react-admin";

export default function CreateAnnouncement(props) {
  return (
    <Create
      resource={"announcement/create"}
      redirect={"/announcement"}
      title={"Create announcement"}
    >
      <SimpleForm redirect="list">
        <TextInput variant="outlined" source="title" />
        <TextInput variant="outlined" source="description" multiline={true} />
        <ImageInput source="photoUrl" label="logo" accept="image/*">
          <ImageField source="src" title="title" />
        </ImageInput>
        <ReferenceInput
          source="compoundId"
          reference="compound"
          label={"compound"}
          name={"compoundId"}
        >
          <SelectInput optionText={"name"} />
        </ReferenceInput>
      </SimpleForm>
    </Create>
  );
}
