import {
  Create,
  SimpleForm,
  TextInput,
  ReferenceInput,
  ImageInput,
  NumberInput,
  ImageField,
  AutocompleteInput,
  useTranslate,
} from "react-admin";
import Title from "./title.facility";
export default function CreateFacility(props) {
  const t = useTranslate();
  return (
    <Create title={<Title create={true} />}>
      <SimpleForm>
        <TextInput variant="outlined" source="name" />
        <TextInput variant="outlined" source="description" multiline={true} />
        <NumberInput variant="outlined" source="price" />
        <ImageInput source="photoUrl" accept="image/*">
          <ImageField source="src" title="title" />
        </ImageInput>
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
      </SimpleForm>
    </Create>
  );
}
