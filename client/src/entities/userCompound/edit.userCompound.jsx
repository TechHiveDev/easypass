import {
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  BooleanInput,
  DateInput,
  useRecordContext,
  ReferenceInput,
  SelectInput,
} from "react-admin";
import UserCompoundTitle from "./title";

export default function EditUserCompound(props) {
  return (
    <Edit title={<UserCompoundTitle />}>
      <SimpleForm redirect="list">
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
        <TextInput variant="outlined" source="streetName" required />
        <NumberInput variant="outlined" source={"blockNumber"} required />
        <NumberInput variant="outlined" source={"unitNumber"} required />
      </SimpleForm>
    </Edit>
  );
}
