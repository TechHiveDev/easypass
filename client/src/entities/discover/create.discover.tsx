import {
  Create,
  SimpleForm,
  TextInput,
  ReferenceInput,
  SelectInput,
  ImageInput,
  ImageField,
  AutocompleteInput,
  useTranslate,
  TimeInput,
  TextField,
} from "react-admin";
import Title from "./title.discover";

export default function CreateDiscover(props: any) {
  const t = useTranslate();
  return (
    <Create
      title={<Title create />}
      resource="discover/create"
      redirect="/discover"
    >
      <SimpleForm>
        <TextInput variant="outlined" source="name" />
        <TextInput variant="outlined" source="shortDescription" multiline />
        <TextInput variant="outlined" source="description" multiline />
        <ImageInput source="photoUrl" accept="image/*">
          <ImageField source="src" title="title" />
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
          label="category"
          name="categoryId"
        >
          <AutocompleteInput
            optionText="name"
            label="category"
            isRequired={true}
            validate={(v) => {
              if (v === "") return t("isRequired={true}Category");
              return undefined;
            }}
          />
        </ReferenceInput>
      </SimpleForm>
    </Create>
  );
}
