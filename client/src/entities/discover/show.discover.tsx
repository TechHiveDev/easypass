import {
  Show,
  SimpleShowLayout,
  TextField,
  ReferenceField,
  ImageField,
  NumberField,
  FunctionField,
} from "react-admin";
import DiscoverTitle from "./title.discover";
import { timeMerger } from "../../utils/dateFormatter";

// ------------------------------------------------

export default function ShowDiscover(props: any) {
  return (
    <Show title={<DiscoverTitle />}>
      <SimpleShowLayout>
        <NumberField source="id" />
        <TextField source="name" />
        <TextField source="shortDescription" />
        <TextField source="description" />
        <ImageField source="photoUrl" />
        <TextField source="phone" />
        <TextField source="address" />
        <FunctionField
          source="openFromTo"
          render={(r: any) => timeMerger(r.openDateFrom, r.openDateTo)}
        />
        <ReferenceField source="compoundId" reference="compound" link="show">
          <TextField source="name" />
        </ReferenceField>
        <ReferenceField source="categoryId" reference="category" link="show">
          <TextField source="name" />
        </ReferenceField>
      </SimpleShowLayout>
    </Show>
  );
}
