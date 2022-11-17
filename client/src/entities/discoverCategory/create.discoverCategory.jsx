import {
  Create,
  SimpleForm,
  TextInput,
  ReferenceInput,
  SelectInput,
  ImageInput,
  ImageField,
  AutocompleteInput,
  useTranslate,
} from 'react-admin';
import Title from './title.discoverCategory';

export default function CreateDiscoverCategory(props) {
  const t = useTranslate();
  return (
    <Create title={<Title create />}>
      <SimpleForm redirect="list">
        <TextInput variant="outlined" source="name"  required />
        <TextInput variant="outlined" source="description" multiline  />
        <p>
          Choose an icon from{' '}
          <a href="https://icons.expo.fyi/" target="_blank" rel="noreferrer">
            {' '}
            Icons
          </a>{' '}
          (Make sure it's Material community icons family) and put it's name
          here{' '}
        </p>
        <TextInput variant="outlined" source="icon" required />
      </SimpleForm>
    </Create>
  );
}
