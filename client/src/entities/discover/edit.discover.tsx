import {
  Edit,
  SimpleForm,
  TextInput,
  ReferenceInput,
  ImageInput,
  AutocompleteInput,
  useTranslate,
  TimeInput,
} from "react-admin";
import AnnouncementTitle from "./title.discover";
import PreviewImage from "../../components/PreviewImage";

// ------------------------------------------------

export default function EditDiscover() {
  const t = useTranslate();
  return (
    <Edit title={<AnnouncementTitle />}>
      <SimpleForm>
        <TextInput variant="outlined" source="name" />
        <TextInput variant="outlined" source="shortDescription" multiline />
        <TextInput variant="outlined" source="description" multiline />
        <ImageInput source="photoUrl">
          <PreviewImage source="src" title="title" />
        </ImageInput>
        <TextInput source="phone" />
        <TextInput source="address" />
        <TimeInput source="openDateFrom" />
        <TimeInput source="openDateTo" />
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
          source="categoryId"
          reference="category"
        >
          <AutocompleteInput
            optionText="name"
            label="category"
            isRequired={true}
            validate={(v: any) => {
              if (v === "") return t("isRequired={true}Category");
              return undefined;
            }}
          />
        </ReferenceInput>
      </SimpleForm>
    </Edit>
  );
}
