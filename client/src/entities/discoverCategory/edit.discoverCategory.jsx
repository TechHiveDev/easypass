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
        <TextInput variant="outlined" source="name" />
        <TextInput variant="outlined" source="description" multiline />
        <ImageInput source="photoUrl" accept="image/*">
          <PreviewImage source="src" />
        </ImageInput>
        <ReferenceInput
          required
          source="compoundId"
          reference="compound"
          label="compound"
          name="compoundId"
        >
          <AutocompleteInput
            label="compound"
            optionText="name"
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
            label="category"
            optionText="name"
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
