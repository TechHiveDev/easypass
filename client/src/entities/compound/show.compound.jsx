import {
  Show,
  SimpleShowLayout,
  TextField,
  NumberField,
  ReferenceManyField,
  Datagrid,
  ReferenceField,
  ImageField,
  EditButton,
} from "react-admin";
import CompoundTitle from "./title";
import CompoundShowActions from "./actions.show.compound";
import Actions from "../../reactAdmin/components/Actions";
// ------------------------------------------------

export default function ShowCompound(props) {
  return (
    <Show title={<CompoundTitle />} actions={<CompoundShowActions />}>
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
            <Actions label="">
              <EditButton label="ra.action.edit" />
            </Actions>
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
            <ImageField variant="outlined" source="photoUrl" />
            <Actions label="">
              <EditButton label="ra.action.edit" />
            </Actions>
          </Datagrid>
        </ReferenceManyField>
      </SimpleShowLayout>
    </Show>
  );
}
