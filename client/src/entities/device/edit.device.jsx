import {
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  BooleanInput,
  DateInput,
  ReferenceInput,
  SelectInput,
} from "react-admin";
import DeviceTitle from "./title";

// ------------------------------------------------

export default function EditDevice(props) {
  return (
    <Edit title={<DeviceTitle />}>
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
    </Edit>
  );
}
