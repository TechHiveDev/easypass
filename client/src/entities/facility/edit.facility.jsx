import {
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  BooleanInput,
  ReferenceInput,
  AutocompleteInput,
  useTranslate,
  ArrayInput,
  SimpleFormIterator,
  DateTimeInput,
} from 'react-admin';
import Title from './title.facility';
import IconHelper from '../../components/IconHelper';

// ------------------------------------------------

export default function EditFacility() {
  const t = useTranslate();
  return (
    <Edit title={<Title />}>
      <SimpleForm>
        <TextInput variant="outlined" source="name" />
        <TextInput variant="outlined" source="description" multiline />
        <NumberInput variant="outlined" source="price" />
        <IconHelper />
        <TextInput variant="outlined" source="icon" />
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
        <ArrayInput source="slots">
          <SimpleFormIterator inline>
            <DateTimeInput source="from" helperText={false} />
            <DateTimeInput source="to" helperText={false} />
            <BooleanInput source="available" helperText={false} />
          </SimpleFormIterator>
        </ArrayInput>
      </SimpleForm>
    </Edit>
  );
}
