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
  FunctionField,
} from "react-admin";
import Actions from "../../reactAdmin/components/Actions";
import { timeFormatter, timeMerger } from "../../utils/dateFormatter";

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
  <ReferenceInput isRequired={true} source="categoryId" reference="category">
    <AutocompleteInput optionText="name" />
  </ReferenceInput>,
];

// ------------------------------------------------

export default function ListDiscover(props: any) {
  return (
    <List filters={announcementFilters}>
      <Datagrid>
        <NumberField source="id" />
        <TextField source="name" />
        <TextField source="shortDescription" />
        <ImageField source="photoUrl" />
        <TextField source="phone" />
        <TextField source="address" />
        <FunctionField
          source="openDateFrom"
          render={(r: any) => timeMerger(r.openDateFrom, r.openDateTo)}
        />
        <ReferenceField source="compoundId" reference="compound" link="show">
          <TextField source="name" />
        </ReferenceField>
        <ReferenceField source="categoryId" reference="category" link="show">
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
