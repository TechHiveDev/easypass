import {
  Show,
  SimpleShowLayout,
  TextField,
  NumberField,
  BooleanField,
  useRecordContext,
  ImageField,
  ReferenceManyField,
  Datagrid,
  ReferenceField,
} from "react-admin";
import UserTitle from "./title";

// ------------------------------------------------
export default function ShowUser(props) {
  return (
    <Show title={<UserTitle />}>
      <SimpleShowLayout>
        <NumberField variant="outlined" source="id" />
        <TextField variant="outlined" source="email" />
        <TextField variant="outlined" source="name" />
        <TextField variant="outlined" source="type" />
        <ImageField source="photoUrl" title="photo" />
        <BooleanField variant="outlined" source="active" />
        <TextField variant="outlined" source="phone" />
        <ReferenceManyField
          label="Properties"
          reference="userCompound"
          target="userId"
        >
          <Datagrid>
            <ReferenceField source="compoundId" reference="compound">
              <TextField source="name" />
            </ReferenceField>
            <TextField variant="outlined" source="streetName" />
            <NumberField variant="outlined" source={"blockNumber"} />
            <NumberField variant="outlined" source={"unitNumber"} />
          </Datagrid>
        </ReferenceManyField>
      </SimpleShowLayout>
    </Show>
  );
}
