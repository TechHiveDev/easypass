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

export default function CreateInvitation(props) {
  const t = useTranslate();
  return (
    <Create>
      <SimpleForm redirect="list">
        <TextInput variant="outlined" source="name" />
        <SelectInput
          required
          name={"type"}
          source={"type"}
          choices={[
            { id: "Visitor", name: t("userType." + "Visitor") },
            { id: "Delivery", name: t("userType." + "Delivery") },
          ]}
        />
        <TextInput variant="outlined" source="notes" />
        <ReferenceInput
          required
          source="compoundId"
          reference="compound"
          label={"compound"}
          name={"compoundId"}
        >
          <AutocompleteInput
            label="compound"
            required
            validate={(v) => {
              if (v === "") return t("requiredCompound");
              return undefined;
            }}
          />
        </ReferenceInput>
        <ReferenceInput required label="user" source="userId" reference="user">
          <AutocompleteInput
            label="user"
            required
            validate={(v) => {
              if (v === "") return t("requiredUser");
              return undefined;
            }}
          />
        </ReferenceInput>
      </SimpleForm>
    </Create>
  );
}
