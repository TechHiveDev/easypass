import {
  List,
  Datagrid,
  TextField,
  NumberField,
  BooleanField,
  DateField,
  ShowButton,
  EditButton,
  ImageField,
  DeleteButton,
  ReferenceField,
  TextInput,
  DateTimeInput,
  BooleanInput,
  ReferenceInput,
  SelectInput,
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
export default function ListDiscoverCategory(props: any) {
  return (
    <List filters={announcementFilters}>
      <Datagrid>
        <NumberField source="id" />
        <TextField source="name" />
        <TextField source="description" />
        <TextField source="icon" />
        <Actions label="">
          <ShowButton label="ra.action.show" />
          <EditButton label="ra.action.edit" />
          <DeleteButton label="ra.action.delete" />
        </Actions>
      </Datagrid>
    </List>
  );
}
