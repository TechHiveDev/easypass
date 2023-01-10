import {
  Show,
  SimpleShowLayout,
  TextField,
  NumberField,
  ReferenceField,
} from "react-admin";
import UserCompoundTitle from "./title.userCompound";

// ------------------------------------------------

export default function ShowUserCompound(props: any) {
  return (
    <Show title={<UserCompoundTitle />}>
      <SimpleShowLayout>
        <NumberField source="id" />
        <ReferenceField source="userId" reference="user" link="show">
          <TextField source="name" />
        </ReferenceField>
        <ReferenceField source="compoundId" reference="compound" link="show">
          <TextField source="name" />
        </ReferenceField>
        <TextField source="streetName" />
        <NumberField source={"blockNumber"} />
        <NumberField source={"unitNumber"} />
      </SimpleShowLayout>
    </Show>
  );
}
