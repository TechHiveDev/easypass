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

export default function ShowCompound(props: any) {
  return (
    <Show title={<CompoundTitle />} actions={<CompoundShowActions />}>
      <SimpleShowLayout>
        <NumberField source="id" />
        <TextField source="name" />
        <ImageField source="logoUrl" title="logo" />
        <TextField source="location" />
        <ReferenceManyField
          label="properties"
          reference="userCompound"
          target="compoundId"
          // link="show"
          pagination={<Pagination />}
          perPage={10}
        >
          <Datagrid>
            <ReferenceField source="userId" reference="user" link="show">
              <TextField source="name" />
            </ReferenceField>
            <TextField source="streetName" />
            <NumberField source="blockNumber" />
            <NumberField source="unitNumber" />
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
          // link="show"
          pagination={<Pagination />}
          perPage={10}
        >
          <Datagrid>
            <TextField source="title" />
            <TextField source="description" />
            <ImageField source="photoUrl" />
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
          // link="show"
          pagination={<Pagination />}
          perPage={10}
        >
          <Datagrid>
            <NumberField source="id" />
            <TextField source="name" />
            <TextField source="description" />
            <TextField source="price" />
            <ImageField source="photoUrl" />
            <Actions label="">
              <ShowButton label="ra.action.show" />
              <EditButton label="ra.action.edit" />
            </Actions>
          </Datagrid>
        </ReferenceManyField>{" "}
        <ReferenceManyField
          label="menu.Discover"
          reference="discover"
          target="compoundId"
          // link="show"
          pagination={<Pagination />}
          perPage={10}
        >
          <Datagrid>
            <TextField source="name" />
            <TextField source="description" />
            <ImageField source="photoUrl" />
            <ReferenceField
              source="categoryId"
              reference="category"
              link="show"
            >
              <TextField source="name" />
            </ReferenceField>
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
