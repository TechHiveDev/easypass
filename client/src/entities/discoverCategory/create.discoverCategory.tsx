import { Create, SimpleForm, TextInput } from "react-admin";
import Title from "./title.discoverCategory";
import IconHelper from "../../components/IconHelper";

export default function CreateDiscoverCategory() {
  return (
    <Create title={<Title create />}>
      <SimpleForm>
        <TextInput variant="outlined" source="name" isRequired={true} />
        <TextInput variant="outlined" source="description" multiline />
        <IconHelper />
        <TextInput variant="outlined" source="icon" isRequired={true} />
      </SimpleForm>
    </Create>
  );
}
