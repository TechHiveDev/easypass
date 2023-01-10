import {
  Create,
  SimpleForm,
  TextInput,
  ReferenceInput,
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
          isRequired={true}
          source="compoundId"
          reference="compound"
          label="compound"
          name="compoundId"
        >
          <AutocompleteInput
            optionText="name"
            label="compound"
            isRequired={true}
            validate={(v: any) => {
              if (v === "") return t("isRequired={true}Compound");
              return undefined;
            }}
          />
        </ReferenceInput>
      </SimpleForm>
    </Create>
  );
}
