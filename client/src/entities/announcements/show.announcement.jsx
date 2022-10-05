import {
  Show,
  SimpleShowLayout,
  TextField,
  NumberField,
  BooleanField,
  DateField,
  ReferenceField,
  TextInput,
  ReferenceInput,
  SelectInput,
} from "react-admin";
import DeviceTitle from "./title";

// ------------------------------------------------

export default function ShowAnnouncement(props) {
  return (
    <Show title={<DeviceTitle />}>
      <SimpleShowLayout>
        <TextField variant="outlined" source="title" />
        <TextField variant="outlined" source="description" multiline={true} />
        <TextField variant="outlined" source="photoUrl" />
        <ReferenceField
          source="compoundId"
          reference="compound"
          label="compound"
        >
          <TextField source="name" />
        </ReferenceField>
      </SimpleShowLayout>
    </Show>
  );
}
