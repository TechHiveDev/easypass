import {
  ArrayInput,
  AutocompleteInput,
  BooleanInput,
  DateTimeInput,
  Edit,
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

// ------------------------------------------------
let editCurrentTime: any;

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
          source="compoundId"
          reference="compound"
          label="compound"
          name="compoundId"
          isRequired={true}
        >
          <AutocompleteInput
            label="compound"
            optionText="name"
            isRequired={true}
            validate={(v: any) =>
              v === "" ? t("isRequired={true}Compound") : undefined
            }
          />
        </ReferenceInput>
        <ArrayInput source="slots">
          <SimpleFormIterator inline>
            <DateTimeInput
              isRequired={true}
              source="from"
              helperText={false}
              validate={[
                (value) => {
                  editCurrentTime = value;
                  if (new Date(Date.parse(value)) < new Date()) {
                    return `must set date and time to later time not now or in the past`;
                  }
                },
              ]}
            />
            <TimeInput
              isRequired={true}
              source="to"
              helperText={false}
              validate={[
                (value) => {
                  const from = new Date(editCurrentTime);
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
              isRequired={true}
              defaultValue
              source="available"
              helperText={false}
            />
          </SimpleFormIterator>
        </ArrayInput>
      </SimpleForm>
    </Edit>
  );
}
