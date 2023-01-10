import { Show, SimpleShowLayout, TextField, NumberField } from "react-admin";
import DiscoverTitle from "./title.discoverCategory";

// ------------------------------------------------

export default function ShowDiscoverCategory(props: any) {
  return (
    <Show title={<DiscoverTitle />}>
      <SimpleShowLayout>
        <NumberField source="id" />
        <TextField source="name" />
        <TextField source="description" />
        <TextField source="icon" />
      </SimpleShowLayout>
    </Show>
  );
}
