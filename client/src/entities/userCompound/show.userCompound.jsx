import {
  Show,
  SimpleShowLayout,
  TextField,
  NumberField,
  ReferenceField,
} from "react-admin";
import UserCompoundTitle from "./title";

// ------------------------------------------------

export default function ShowUserCompound(props) {
  return (
    <Show title={<UserCompoundTitle />}>
      <SimpleShowLayout>
        <NumberField variant="outlined" source="id" />
        <ReferenceField source="userId" reference="user">
          <TextField source="name" />
        </ReferenceField>
        <ReferenceField source="compoundId" reference="compound">
          <TextField source="name" />
        </ReferenceField>
        <TextField variant="outlined" source="streetName" />
        <NumberField variant="outlined" source={"blockNumber"} />
        <NumberField variant="outlined" source={"unitNumber"} />
      </SimpleShowLayout>
    </Show>
  );
}
