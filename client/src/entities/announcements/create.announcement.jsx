import {
  Create,
  SimpleForm,
  TextInput,
  ReferenceInput,
  SelectInput,
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
        <TextInput variant="outlined" source="photoUrl" />
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
