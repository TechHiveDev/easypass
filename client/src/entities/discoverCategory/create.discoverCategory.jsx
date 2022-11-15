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
        <TextInput variant="outlined" source="name" />
        <TextInput variant="outlined" source="description" multiline />
      </SimpleForm>
    </Create>
  );
}
