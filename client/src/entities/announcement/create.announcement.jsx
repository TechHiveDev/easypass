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
import Title from './title.announcement';

export default function CreateAnnouncement(props) {
  const t = useTranslate();
  return (
    <Create
      resource="announcement/create"
      redirect="/announcement"
      title={<Title create />}
    >
      <SimpleForm redirect="list">
        <TextInput variant="outlined" source="title" />
        <TextInput variant="outlined" source="description" multiline />
        <ImageInput source="photoUrl" accept="image/*">
          <ImageField source="src" title="title" />
        </ImageInput>
        <ReferenceInput
          required
          source="compoundId"
          reference="compound"
          label="compound"
          name="compoundId"
        >
          <AutocompleteInput
            optionText="name"
            label="compound"
            required
            validate={(v) => {
              if (v === '') return t('requiredCompound');
              return undefined;
            }}
          />
        </ReferenceInput>
      </SimpleForm>
    </Create>
  );
}
