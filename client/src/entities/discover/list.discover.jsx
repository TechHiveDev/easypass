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
    label={"compound"}
    name={"compoundId"}
  >
    <AutocompleteInput />
  </ReferenceInput>,
];
export default function ListDiscover(props) {
  return (
    <List filters={announcementFilters}>
      <Datagrid>
        <NumberField variant="outlined" source="id" />
        <TextField variant="outlined" source="title" />
        <ImageField variant="outlined" source="photoUrl" />
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
