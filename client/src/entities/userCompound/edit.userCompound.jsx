import {
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  BooleanInput,
  DateInput,
  useRecordContext,
} from "react-admin";
import UserCompoundTitle from "./title";

export default function EditUserCompound(props) {
  return (
    <Edit title={<UserCompoundTitle />}>
      <SimpleForm redirect="list">
        <NumberInput variant="outlined" source="id" />
        <NumberInput variant="outlined" source="userId" />

        <NumberInput variant="outlined" source="compoundId" />
      </SimpleForm>
    </Edit>
  );
}
