import { Edit, ImageInput, SimpleForm, TextInput } from "react-admin";
import CompoundTitle from "./title.compound";
import PreviewImage from "../../components/PreviewImage";

export default function EditCompound() {
  return (
    <Edit title={<CompoundTitle />}>
      <SimpleForm>
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
