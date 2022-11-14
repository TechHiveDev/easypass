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
  useTranslate, ArrayInput, SimpleFormIterator, DateTimeInput,
} from "react-admin";
import Title from "./title.facility";
import PreviewImage from "../../components/PreviewImage";

// ------------------------------------------------

export default function EditFacility(props) {
  const t = useTranslate();
  return (
    <Edit title={<Title />}>
      <SimpleForm>
        <TextInput variant="outlined" source="name" />
        <TextInput variant="outlined" source="description" multiline={true} />
        <NumberInput variant="outlined" source="price" />
        <p>Choose an icon from <a href={"https://icons.expo.fyi/"} target="_blank"> Icons</a> (Make sure it's Material community icons family) and put it's name here </p>
        <TextInput variant="outlined" source="icon" />
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
        <ArrayInput source="slots" >
          <SimpleFormIterator inline>
            <DateTimeInput source="from" helperText={false} />
            <DateTimeInput source="to" helperText={false} />
            <BooleanInput source="available" helperText={false} />
          </SimpleFormIterator>
        </ArrayInput>
      </SimpleForm>
    </Edit>
  );
}
