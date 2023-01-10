import {
  List,
  Datagrid,
  TextField,
  NumberField,
  ShowButton,
  EditButton,
  ImageField,
  DeleteButton,
  ReferenceField,
  ReferenceInput,
  AutocompleteInput,
} from "react-admin";
import Actions from "../../reactAdmin/components/Actions";

// ------------------------------------------------

const announcementFilters = [
  <ReferenceInput
    source="compoundId"
    reference="compound"
    label="compound"
    name="compoundId"
  >
    <AutocompleteInput optionText="name" />
  </ReferenceInput>,
];

// ------------------------------------------------

export default function ListAnnouncement(_props: any) {
  return (
    <List filters={announcementFilters}>
      <Datagrid>
        <NumberField source="id" />
        <TextField source="title" />
        <ImageField source="photoUrl" />
        <ReferenceField source="compoundId" reference="compound" link="show">
          <TextField source="name" />
        </ReferenceField>

        <Actions label="">
          <ShowButton label="ra.action.show" />
          <EditButton label="ra.action.edit" />
          <DeleteButton label="ra.action.delete" />
        </Actions>
      </Datagrid>
    </List>
  );
}
