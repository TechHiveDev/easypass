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
  ImageField,
  SearchInput,
} from "react-admin";
import Actions from "../../reactAdmin/components/Actions";

// ------------------------------------------------
const facilityFilters = [
  <SearchInput source="q" alwaysOn />,
  <ReferenceInput
    source="compoundId"
    reference="compound"
    label={"compound"}
    name={"compoundId"}
  >
    <AutocompleteInput />
  </ReferenceInput>,
];
export default function ListFacility(props) {
  return (
    <List filters={facilityFilters}>
      <Datagrid>
        <NumberField variant="outlined" source="id" />
        <TextField variant="outlined" source="name" />
        <TextField variant="outlined" source="price" />
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
