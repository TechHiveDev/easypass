import {
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  BooleanInput,
  DateInput,
} from "react-admin";

// ------------------------------------------------

export default function CreateUserCompound(props) {
  return (
    <Create>
      <SimpleForm redirect="list">
        <NumberInput variant="outlined" source="id" />
        <NumberInput variant="outlined" source="userId" />

        <NumberInput variant="outlined" source="compoundId" />
      </SimpleForm>
    </Create>
  );
}
