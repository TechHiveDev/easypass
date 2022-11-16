import {
  Edit,
  SimpleForm,
  TextInput,
  ReferenceInput,
  ImageInput,
  AutocompleteInput,
  useTranslate,
} from 'react-admin';
import AnnouncementTitle from './title.discoverCategory';
import PreviewImage from '../../components/PreviewImage';

// ------------------------------------------------

export default function EditDiscoverCategory(props) {
  const t = useTranslate();
  return (
    <Edit title={<AnnouncementTitle />}>
      <SimpleForm redirect="list">
        <TextInput variant="outlined" source="name" required/>
        <TextInput variant="outlined" source="description" multiline />
        <p>
          Choose an icon from{' '}
          <a href="https://icons.expo.fyi/" target="_blank" rel="noreferrer">
            {' '}
            Icons
          </a>{' '}
          (Make sure it's Material community icons family) and put it's name
          here{' '}
        </p>
        <TextInput variant="outlined" source="icon" required/>
      </SimpleForm>
    </Edit>
  );
}
