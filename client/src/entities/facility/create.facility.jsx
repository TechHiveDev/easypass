import {
  Create,
  SimpleForm,
  TextInput,
  ReferenceInput,
  NumberInput,
  AutocompleteInput,
  useTranslate,
  ArrayInput,
  SimpleFormIterator,
  DateTimeInput,
  BooleanInput,
} from 'react-admin';
import Title from './title.facility';
import IconHelper from '../../components/IconHelper';

export default function CreateFacility() {
  const t = useTranslate();
  return (
    <Create title={<Title create />}>
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
    </Create>
  );
}
