import {
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  BooleanInput,
  DateInput,
  ReferenceInput,
  SelectInput,
  ImageInput,
  ImageField,
  AutocompleteInput,
  useTranslate,
  DateTimeInput,
  NumberField,
  TextField,
  FunctionField,
  ReferenceField,
} from 'react-admin';
import Title from './title.request';
import PreviewImage from '../../components/PreviewImage';

// ------------------------------------------------

export default function EditRequest(props) {
  const t = useTranslate();
  return (
    <Edit title={<Title />}>
      <SimpleForm redirect="list">
        <SelectInput
          variant="outlined"
          source="type"
          choices={[
            { id: 'Facility', name: t('requestType.' + 'Facility') },
            { id: 'Issue', name: t('requestType.' + 'Issue') },
          ]}
        />
        <DateTimeInput variant="outlined" source="availableDateFrom" disabled />
        <DateTimeInput variant="outlined" source="availableDateTo" disabled />
        <TextInput variant="outlined" source="requestNote" disabled />
        <TextInput source="respondNote" variant="outlined" />
        {/* Pending || Refused || InProgress || Completed */}
        <SelectInput
          variant="outlined"
          source="status"
          choices={[
            { id: 'Pending', name: t('status.' + 'Pending') },
            { id: 'Refused', name: t('status.' + 'Refused') },
            { id: 'InProgress', name: t('status.' + 'InProgress') },
            { id: 'Completed', name: t('status.' + 'Completed') },
          ]}
        />
        <ReferenceInput
          required
          source="compoundId"
          reference="compound"
          label="compound"
          name="compoundId"
        >
          <AutocompleteInput
            optionText="name"
            disabled
            label="compound"
            required
            validate={(v) => {
              if (v === '') return t('requiredCompound');
              return undefined;
            }}
          />
        </ReferenceInput>{' '}
        <ReferenceInput
          required
          source="userId"
          reference="user"
          label="user"
          name="userId"
        >
          <AutocompleteInput
            optionText="name"
            label="user"
            required
            validate={(v) => {
              if (v === '') return t('requiredUser');
              return undefined;
            }}
          />
        </ReferenceInput>
      </SimpleForm>
    </Edit>
  );
}
