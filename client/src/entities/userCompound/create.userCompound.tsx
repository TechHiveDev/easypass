import {
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  ReferenceInput,
  SelectInput,
  AutocompleteInput,
  useTranslate,
} from "react-admin";
import Title from "./title.userCompound";

// ------------------------------------------------

export default function CreateUserCompound(props: any) {
  const t = useTranslate();
  return (
    <Create title={<Title create />}>
      <SimpleForm>
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
            validate={(v) => {
              if (v === "") return t("isRequired={true}Compound");
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
              if (v === "") return t("isRequired={true}User");
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
    </Create>
  );
}
