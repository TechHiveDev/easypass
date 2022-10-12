import {
  Create,
  SimpleForm,
  TextInput,
  ReferenceInput,
  SelectInput,
  ImageInput,
  ImageField,
} from "react-admin";
import Title from "./title";

export default function CreateAnnouncement(props) {
  return (
    <Create
      resource={"announcement/create"}
      redirect={"/announcement"}
      title={<Title create={true} />}
    >
      <SimpleForm redirect="list">
        <TextInput variant="outlined" source="title" />
        <TextInput variant="outlined" source="description" multiline={true} />
        <ImageInput source="photoUrl" accept="image/*">
          <ImageField source="src" title="title" />
        </ImageInput>
        <ReferenceInput
          source="compoundId"
          reference="compound"
          name={"compoundId"}
        >
          <SelectInput optionText={"name"} />
        </ReferenceInput>
      </SimpleForm>
    </Create>
  );
}
