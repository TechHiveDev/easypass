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
  ImageField,
} from "react-admin";
import DeviceTitle from "./title";

// ------------------------------------------------

export default function ShowAnnouncement(props) {
  return (
    <Show title={<DeviceTitle />}>
      <SimpleShowLayout>
        <TextField variant="outlined" source="title" />
        <TextField variant="outlined" source="description" multiline={true} />
        <ImageField source="photoUrl" title="title" />
        <ReferenceField
          source="compoundId"
          reference="compound"
          label="compound"
          link="show"
        >
          <TextField source="name" />
        </ReferenceField>
      </SimpleShowLayout>
    </Show>
  );
}
