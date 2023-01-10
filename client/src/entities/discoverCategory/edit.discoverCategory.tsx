import { Edit, SimpleForm, TextInput } from 'react-admin';
import AnnouncementTitle from './title.discoverCategory';
import IconHelper from '../../components/IconHelper';

// ------------------------------------------------

export default function EditDiscoverCategory() {
  return (
    <Edit title={<AnnouncementTitle />}>
      <SimpleForm redirect="list">
        <TextInput variant="outlined" source="name" required />
        <TextInput variant="outlined" source="description" multiline />
        <IconHelper />
        <TextInput variant="outlined" source="icon" required />
      </SimpleForm>
    </Edit>
  );
}
