import {
  Show,
  SimpleShowLayout,
  TextField,
  ReferenceField,
  ImageField,
} from "react-admin";
import AnnouncementTitle from "./title.announcement";

// ------------------------------------------------

export default function ShowAnnouncement(props: any) {
  return (
    <Show title={<AnnouncementTitle />}>
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
