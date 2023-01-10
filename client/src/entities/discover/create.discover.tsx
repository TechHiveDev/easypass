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
  TimeInput, TextField,
} from 'react-admin';
import Title from './title.discover';

export default function CreateDiscover(props) {
  const t = useTranslate();
  return (
    <Create
      title={<Title create />}
      resource="discover/create"
      redirect="/discover"
    >
      <SimpleForm redirect="list">
        <TextInput variant="outlined" source="name" />
        <TextInput variant="outlined" source="shortDescription" multiline />
        <TextInput variant="outlined" source="description" multiline />
        <ImageInput source="photoUrl" accept="image/*">
          <ImageField source="src" title="title" />
        </ImageInput>
        <TextInput source="phone" />
        <TextInput source="address" />
        <TimeInput source="openDateFrom" />
        <TimeInput source="openDateTo" />
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
        <ReferenceInput
          required
          source="categoryId"
          reference="category"
          label="category"
          name="categoryId"
        >
          <AutocompleteInput
            optionText="name"
            label="category"
            required
            validate={(v) => {
              if (v === '') return t('requiredCategory');
              return undefined;
            }}
          />
        </ReferenceInput>
      </SimpleForm>
    </Create>
  );
}
