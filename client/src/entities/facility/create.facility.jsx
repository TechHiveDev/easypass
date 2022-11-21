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
  TimeInput,
  required,
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
            <DateTimeInput
              source="from"
              helperText={false}
              validate={required()}
            />
            <TimeInput source="to" helperText={false} validate={required()} />
            <BooleanInput
              defaultValue
              source="available"
              helperText={false}
              validate={required()}
            />
          </SimpleFormIterator>
        </ArrayInput>
      </SimpleForm>
    </Create>
  );
}
