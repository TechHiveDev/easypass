import {
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  BooleanInput,
  DateInput,
  ReferenceInput,
  SelectInput,
  AutocompleteInput,
  useTranslate,
} from "react-admin";
import DeviceTitle from "./title.device";

// ------------------------------------------------

export default function EditDevice(_props: any) {
  const t = useTranslate();
  return (
    <Edit title={<DeviceTitle />}>
      <SimpleForm>
        <TextInput variant="outlined" source="ip" />
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
            isRequired={true}
            validate={(v) => {
              if (v === "") return t("requiredCompound");
              return undefined;
            }}
          />
        </ReferenceInput>
      </SimpleForm>
    </Edit>
  );
}
