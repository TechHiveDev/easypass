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
import Title from "./title.facility";

// ------------------------------------------------

export default function ShowFacility(props) {
  return (
    <Show title={<Title />}>
      <SimpleShowLayout>
        <TextField variant="outlined" source="name" />
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
