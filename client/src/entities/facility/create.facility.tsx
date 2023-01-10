import {
  ArrayInput,
  AutocompleteInput,
  BooleanInput,
  Create,
  DateTimeInput,
  NumberInput,
  ReferenceInput,
  SimpleForm,
  SimpleFormIterator,
  TextInput,
  TimeInput,
  useTranslate,
} from "react-admin";
import Title from "./title.facility";
import IconHelper from "../../components/IconHelper";

// =================================================================

let currentTime: any;

// =================================================================

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
          isRequired={true}
          source="compoundId"
          reference="compound"
          label="compound"
          name="compoundId"
        >
          <AutocompleteInput
            label="compound"
            optionText="name"
            isRequired={true}
            validate={(v) => {
              if (v === "") return t("isRequired={true}Compound");
              return undefined;
            }}
          />
        </ReferenceInput>
        <ArrayInput source="slots">
          <SimpleFormIterator inline>
            <DateTimeInput
              source="from"
              helperText={false}
              isRequired={true}
              validate={[
                (value) => {
                  currentTime = value;
                  if (new Date(Date.parse(value)) < new Date()) {
                    return `must set date and time to later time not now or in the past`;
                  }
                },
              ]}
            />
            <TimeInput
              source="to"
              helperText={false}
              isRequired={true}
              validate={[
                (value) => {
                  const from = new Date(currentTime);
                  const fromDate = from.toISOString().split("T")[0];
                  const to = new Date(value);
                  const toTime = to.toISOString().split("T")[1];
                  const toTransformed = `${fromDate}T${toTime}`;
                  if (
                    new Date(toTransformed) < from ||
                    toTime.substring(0, 5) ===
                      from.toISOString().split("T")[1].substring(0, 5)
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
              isRequired={true}
            />
          </SimpleFormIterator>
        </ArrayInput>
      </SimpleForm>
    </Create>
  );
}
