import {
  Create,
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

// ------------------------------------------------

export default function CreateDevice(_props: any) {
  const t = useTranslate();
  return (
    <Create>
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
    </Create>
  );
}
