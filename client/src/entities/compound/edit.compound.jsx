import {
  Edit,
  ImageField,
  ImageInput,
  SimpleForm,
  TextInput,
  useRecordContext,
} from "react-admin";
import CompoundTitle from "./title";
import PreviewImage from "../../components/PreviewImage";
export default function EditCompound(props) {
  return (
    <Edit title={<CompoundTitle />}>
      <SimpleForm redirect="list">
        <TextInput variant="outlined" source="name" />
        <ImageInput source="logoUrl" accept="image/*">
          <PreviewImage source="src" />
        </ImageInput>
        {/*<p>old logo</p>*/}
        {/*<ImageField source="logoUrl" title="title" />*/}
        <TextInput variant="outlined" source="location" />
      </SimpleForm>
    </Edit>
  );
}
