import {
  Edit,
  SimpleForm,
  TextInput,
  ReferenceInput,
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
          source="compoundId"
          reference="compound"
          label="compound"
          name="compoundId"
          isRequired={true}
        >
          <AutocompleteInput
            optionText="name"
            label="compound"
            isRequired={true}
            validate={(v) => {
              if (v === "") return t("isRequired={true}Compound");
              return undefined;
            }}
          />
        </ReferenceInput>
      </SimpleForm>
    </Edit>
  );
}
