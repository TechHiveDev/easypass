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

export default function CreateUserCompound(props) {
  const t = useTranslate();
  return (
    <Create title={<Title create={true} />}>
      <SimpleForm redirect="list">
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
        <TextInput variant="outlined" source="streetName" required />
        <NumberInput variant="outlined" source={"blockNumber"} required />
        <NumberInput variant="outlined" source={"unitNumber"} required />
      </SimpleForm>
    </Create>
  );
}
