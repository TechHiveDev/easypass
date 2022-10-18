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
  Pagination,
  ShowButton,
} from "react-admin";
import CompoundTitle from "./title.compound";
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
          label="properties"
          reference="userCompound"
          target="compoundId"
          link="show"
          pagination={<Pagination />}
          perPage={10}
        >
          <Datagrid>
            <ReferenceField source="userId" reference="user" link="show">
              <TextField source="name" />
            </ReferenceField>
            <TextField variant="outlined" source="streetName" />
            <NumberField variant="outlined" source={"blockNumber"} />
            <NumberField variant="outlined" source={"unitNumber"} />
            <Actions label="">
              <ShowButton label="ra.action.show" />
              <EditButton label="ra.action.edit" />
            </Actions>
          </Datagrid>
        </ReferenceManyField>
        <ReferenceManyField
          label="announcements"
          reference="announcement"
          target="compoundId"
          link="show"
          pagination={<Pagination />}
          perPage={10}
        >
          <Datagrid>
            <TextField variant="outlined" source="title" />
            <TextField variant="outlined" source="description" />
            <ImageField variant="outlined" source="photoUrl" />
            <Actions label="">
              <ShowButton label="ra.action.show" />
              <EditButton label="ra.action.edit" />
            </Actions>
          </Datagrid>
        </ReferenceManyField>
        <ReferenceManyField
          label="menu.Facility"
          reference="facility"
          target="compoundId"
          link="show"
          pagination={<Pagination />}
          perPage={10}
        >
          <Datagrid>
            <NumberField variant="outlined" source="id" />
            <TextField variant="outlined" source="name" />
            <TextField variant="outlined" source="description" />
            <TextField variant="outlined" source="price" />
            <ImageField variant="outlined" source="photoUrl" />
            <Actions label="">
              <ShowButton label="ra.action.show" />
              <EditButton label="ra.action.edit" />
            </Actions>
          </Datagrid>
        </ReferenceManyField>
      </SimpleShowLayout>
    </Show>
  );
}
