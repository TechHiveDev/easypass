import {
  Edit,
  SimpleForm,
  TextInput,
  ReferenceInput,
  ImageInput,
  AutocompleteInput,
  useTranslate,
} from "react-admin";
import AnnouncementTitle from "./title.announcement";
import PreviewImage from "../../components/PreviewImage";

// ------------------------------------------------

export default function EditAnnouncement(props: any) {
  const t = useTranslate();
  return (
    <Edit title={<AnnouncementTitle />}>
      <SimpleForm>
        <TextInput variant="outlined" source="title" />
        <TextInput variant="outlined" source="description" multiline />
        <ImageInput source="photoUrl" accept="image/*">
          <PreviewImage source="src" />
        </ImageInput>
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
              if (v === "") return t("requiredCompound");
              return undefined;
            }}
          />
        </ReferenceInput>
      </SimpleForm>
    </Edit>
  );
}
