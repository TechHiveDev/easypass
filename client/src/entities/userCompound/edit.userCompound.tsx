import {
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  ReferenceInput,
  AutocompleteInput,
  useTranslate,
} from "react-admin";
import UserCompoundTitle from "./title.userCompound";

// =================================================================

export default function EditUserCompound(props: any) {
  const t = useTranslate();
  return (
    <Edit title={<UserCompoundTitle />}>
      <SimpleForm>
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
              if (v === "") return t("requiredCompound");
              return undefined;
            }}
          />
        </ReferenceInput>
        <ReferenceInput
          isRequired={true}
          label="user"
          source="userId"
          reference="user"
        >
          <AutocompleteInput
            optionText="name"
            label="user"
            isRequired={true}
            validate={(v) => {
              if (v === "") return t("requiredUser");
              return undefined;
            }}
          />
        </ReferenceInput>
        <TextInput variant="outlined" source="streetName" isRequired={true} />
        <NumberInput
          variant="outlined"
          source="blockNumber"
          isRequired={true}
        />
        <NumberInput variant="outlined" source="unitNumber" isRequired={true} />
      </SimpleForm>
    </Edit>
  );
}
