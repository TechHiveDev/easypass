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
        <ReferenceManyField
          label="Announcements"
          reference="announcement"
          target="compoundId"
        >
          <Datagrid>
            <TextField variant="outlined" source="title" />
            <TextField variant="outlined" source="description" />
            <TextField variant="outlined" source="logoUrl" />
            <ImageField source="logoUrl" title="title" />
          </Datagrid>
        </ReferenceManyField>
      </SimpleShowLayout>
    </Show>
  );
}
