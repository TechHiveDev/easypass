import {
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  BooleanInput,
  DateInput,
  ReferenceInput,
  SelectInput,
  ImageInput,
  ImageField,
  AutocompleteInput,
  useTranslate,
} from "react-admin";
import Title from "./title.facility";
import PreviewImage from "../../components/PreviewImage";

// ------------------------------------------------

export default function EditFacility(props) {
  const t = useTranslate();
  return (
    <Edit title={<Title />}>
      <SimpleForm redirect="list">
        <TextInput variant="outlined" source="name" />
        <TextInput variant="outlined" source="description" multiline={true} />
        <NumberInput variant="outlined" source="price" />
        <ImageInput source="photoUrl" accept="image/*">
          <PreviewImage source="src" />
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
    </Edit>
  );
}
