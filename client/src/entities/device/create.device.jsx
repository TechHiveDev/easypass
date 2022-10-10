import {
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  BooleanInput,
  DateInput,
  ReferenceInput,
  SelectInput,
} from "react-admin";

// ------------------------------------------------

export default function CreateDevice(props) {
  return (
    <Create>
      <SimpleForm redirect="list">
        <TextInput variant="outlined" source="ip" />
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
