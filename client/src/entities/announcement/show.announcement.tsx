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
        <TextField source="title" />
        <TextField source="description" />
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
