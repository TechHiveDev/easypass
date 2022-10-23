import {
  Show,
  SimpleShowLayout,
  TextField,
  ReferenceField,
  ImageField,
} from "react-admin";
import DiscoverTitle from "./title.discover";

// ------------------------------------------------

export default function ShowDiscover(props) {
  return (
    <Show title={<DiscoverTitle />}>
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
