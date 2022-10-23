import {
  Edit,
  SimpleForm,
  TextInput,
  ReferenceInput,
  ImageInput,
  AutocompleteInput,
  useTranslate,
} from "react-admin";
import AnnouncementTitle from "./title.discover";
import PreviewImage from "../../components/PreviewImage";

// ------------------------------------------------

export default function EditDiscover(props) {
  const t = useTranslate();
  return (
    <Edit title={<AnnouncementTitle />}>
      <SimpleForm redirect="list">
        <TextInput variant="outlined" source="title" />
        <TextInput variant="outlined" source="description" multiline={true} />
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
