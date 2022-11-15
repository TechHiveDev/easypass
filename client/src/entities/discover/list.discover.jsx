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
} from 'react-admin';
import Actions from '../../reactAdmin/components/Actions';
import { timeFormatter, timeMerger } from '../../utils/dateFormatter';

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
  <ReferenceInput
    required
    source="categoryId"
    reference="category"
    // label="category"
    // name="name"
  >
    <AutocompleteInput optionText="name" />
  </ReferenceInput>,
];

export default function ListDiscover(props) {
  return (
    <List filters={announcementFilters}>
      <Datagrid>
        <NumberField variant="outlined" source="id" />
        <TextField variant="outlined" source="name" />
        <TextField variant="outlined" source="shortDescription" />
        <ImageField variant="outlined" source="photoUrl" />
        <TextField variant="outlined" source="phone" />
        <TextField variant="outlined" source="address" />
        <FunctionField
          variant="outlined"
          source="openFromTo"
          render={(r) => timeMerger(r.openDateFrom, r.openDateTo)}
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
