import {
  List,
  Datagrid,
  TextField,
  NumberField,
  ShowButton,
  ReferenceField,
  TextInput,
  DateTimeInput,
  DateInput,
} from "react-admin";
import Actions from "../../reactAdmin/components/Actions";

// ------------------------------------------------
const scanFilters = [
  <DateTimeInput label="from" source="createdAt.gte" alwaysOn />,
  <DateTimeInput label="to" source="createdAt.lte" alwaysOn />,
];
export default function ListScan(props) {
  return (
    <List filters={scanFilters}>
      <Datagrid>
        <NumberField variant="outlined" source="id" />
        <TextField variant="outlined" source="invitationId" />
        <TextField variant="outlined" source="deviceId" />
        <TextField variant="outlined" source="success" />
        <ReferenceField source="compoundId" reference="compound">
          <TextField source="name" />
        </ReferenceField>
        <TextField variant="outlined" source="type" />
        <TextField variant="outlined" source="createdAt" />

        <Actions label="">
          <ShowButton label="ra.action.show" />
        </Actions>
      </Datagrid>
    </List>
  );
}
