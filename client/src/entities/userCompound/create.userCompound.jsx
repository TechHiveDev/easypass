import {
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  ReferenceInput,
  SelectInput,
} from "react-admin";

// ------------------------------------------------

export default function CreateUserCompound(props) {
  return (
    <Create>
      <SimpleForm redirect="list">
        <ReferenceInput
          required
          source="compoundId"
          reference="compound"
          label={"compound"}
          name={"compoundId"}
        >
          <SelectInput optionText={"name"} required />
        </ReferenceInput>
        <ReferenceInput
          required
          source="userId"
          reference="user"
          label={"user"}
          name={"user"}
        >
          <SelectInput optionText={"name"} required />
        </ReferenceInput>
        <TextInput variant="outlined" source="streetName" required />
        <NumberInput variant="outlined" source={"blockNumber"} required />
        <NumberInput variant="outlined" source={"unitNumber"} required />
      </SimpleForm>
    </Create>
  );
}
