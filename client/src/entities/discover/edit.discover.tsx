import {
  Edit,
  SimpleForm,
  TextInput,
  ReferenceInput,
  ImageInput,
  AutocompleteInput,
  useTranslate,
  TimeInput,
} from 'react-admin';
import AnnouncementTitle from './title.discover';
import PreviewImage from '../../components/PreviewImage';

// ------------------------------------------------

export default function EditDiscover() {
  const t = useTranslate();
  return (
    <Edit title={<AnnouncementTitle />}>
      <SimpleForm redirect="list">
        <TextInput variant="outlined" source="name" />
        <TextInput variant="outlined" source="shortDescription" multiline />
        <TextInput variant="outlined" source="description" multiline />
        <ImageInput source="photoUrl" title="title">
          <PreviewImage source="src" title="title" />
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
          // label="category"
          // name="name"
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
    </Edit>
  );
}
