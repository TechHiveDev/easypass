import {
  Show,
  SimpleShowLayout,
  TextField,
  NumberField,
  ReferenceManyField,
  Datagrid,
  ReferenceField,
  ImageField,
} from "react-admin";
import CompoundTitle from "./title";

// ------------------------------------------------

export default function ShowCompound(props) {
  return (
    <Show title={<CompoundTitle />}>
      <SimpleShowLayout>
        <NumberField variant="outlined" source="id" />
        <TextField variant="outlined" source="name" />
        <ImageField source="logoUrl" title="logo" />
        <TextField variant="outlined" source="location" />
        <ReferenceManyField
          label="Users"
          reference="userCompound"
          target="compoundId"
        >
          <Datagrid>
            <ReferenceField source="userId" reference="user">
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
