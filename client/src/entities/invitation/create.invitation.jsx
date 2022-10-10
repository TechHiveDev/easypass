import {
  Create,
  SimpleForm,
  TextInput,
  ReferenceInput,
  SelectInput,
} from "react-admin";

// ------------------------------------------------

export default function CreateInvitation(props) {
  return (
    <Create>
      <SimpleForm redirect="list">
        <TextInput variant="outlined" source="name" />

        <TextInput variant="outlined" source="type" />
        <TextInput variant="outlined" source="notes" />
        <ReferenceInput
          source="compoundId"
          reference="compound"
          label={"compound"}
          name={"compoundId"}
        >
          <SelectInput optionText={"name"} />
        </ReferenceInput>
        <ReferenceInput
          source="userId"
          reference="user"
          label={"user"}
          name={"user"}
        >
          <SelectInput optionText={"name"} />
        </ReferenceInput>
      </SimpleForm>
    </Create>
  );
}
