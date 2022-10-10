import {
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  BooleanInput,
  DateInput,
  ReferenceInput,
  SelectInput,
  ImageInput,
  ImageField,
} from "react-admin";
import DeviceTitle from "./title";

// ------------------------------------------------

export default function EditAnnouncement(props) {
  return (
    <Edit title={<DeviceTitle />}>
      <SimpleForm redirect="list">
        <TextInput variant="outlined" source="title" />
        <TextInput variant="outlined" source="description" multiline={true} />
        <TextInput variant="outlined" source="photoUrl" />
        <ImageInput source="photoUrl" label="new logo" accept="image/*">
          <ImageField source="src" title="title" />
        </ImageInput>
        <p>old photo</p>
        <ImageField
          source="photoUrl"
          title="title"
          label={"old image"}
          displayName={"old image"}
        />
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
