import {
  ArrayInput,
  AutocompleteInput,
  BooleanInput,
  DateTimeInput,
  Edit,
  NumberInput,
  ReferenceInput,
  required,
  SimpleForm,
  SimpleFormIterator,
  TextInput,
  TimeInput,
  useTranslate,
} from 'react-admin';
import Title from './title.facility';
import IconHelper from '../../components/IconHelper';

// ------------------------------------------------
let editCurrentTime;

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
            <DateTimeInput
              source="from"
              helperText={false}
              validate={[
                required(),
                (value) => {
                  editCurrentTime = value;
                  if (Date.parse(value) < new Date()) {
                    return `must set date and time to later time not now or in the past`;
                  }
                },
              ]}
            />
            <TimeInput
              source="to"
              helperText={false}
              validate={[
                required(),
                (value) => {
                  const from = new Date(editCurrentTime);
                  const fromDate = from.toISOString().split('T')[0];
                  const to = new Date(value);
                  const toTime = to.toISOString().split('T')[1];
                  const toTransformed = `${fromDate}T${toTime}`;
                  if (
                    new Date(toTransformed) < from ||
                    toTime.substring(0, 5) ===
                      from.toISOString().split('T')[1].substring(0, 5)
                  ) {
                    return `to value can't be less than or equal to from value`;
                  }
                },
              ]}
            />
            <BooleanInput
              defaultValue
              source="available"
              helperText={false}
              validate={required()}
            />
          </SimpleFormIterator>
        </ArrayInput>
      </SimpleForm>
    </Edit>
  );
}
