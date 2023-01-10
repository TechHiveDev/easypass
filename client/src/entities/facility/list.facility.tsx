import {
  List,
  Datagrid,
  TextField,
  NumberField,
  ShowButton,
  EditButton,
  DeleteButton,
  ReferenceField,
  ReferenceInput,
  AutocompleteInput,
  SearchInput,
} from "react-admin";
import Actions from "../../reactAdmin/components/Actions";

// ------------------------------------------------

const facilityFilters = [
  <SearchInput source="q" alwaysOn />,
  <ReferenceInput
    source="compoundId"
    reference="compound"
    label="compound"
    name="compoundId"
  >
    <AutocompleteInput optionText="name" />
  </ReferenceInput>,
];

export default function ListFacility(_props: any) {
  return (
    <List filters={facilityFilters}>
      <Datagrid>
        <NumberField source="id" />
        <TextField source="name" />
        <TextField source="price" />
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
