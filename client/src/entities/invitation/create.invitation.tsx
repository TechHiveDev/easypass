import {
  Create,
  SimpleForm,
  TextInput,
  ReferenceInput,
  SelectInput,
  AutocompleteInput,
  useTranslate,
} from "react-admin";

// ------------------------------------------------

export default function CreateInvitation(_props: any) {
  const t = useTranslate();
  return (
    <Create>
      <SimpleForm>
        <TextInput variant="outlined" source="name" />
        <SelectInput
          isRequired={true}
          name="type"
          source="type"
          choices={[
            { id: "Visitor", name: t("userType." + "Visitor") },
            { id: "Delivery", name: t("userType." + "Delivery") },
          ]}
        />
        <TextInput variant="outlined" source="notes" />
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
      </SimpleForm>
    </Create>
  );
}
