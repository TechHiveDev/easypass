import {
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  BooleanInput,
  DateInput,
} from "react-admin";

// ------------------------------------------------

export default function EditUserCompound(props) {
  return (
    <Edit>
      <SimpleForm redirect="list">
        <NumberInput variant="outlined" source="id" />
        <NumberInput variant="outlined" source="userId" />

        <NumberInput variant="outlined" source="compoundId" />
      </SimpleForm>
    </Edit>
  );
}
