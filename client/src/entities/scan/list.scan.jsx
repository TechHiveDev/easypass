import {
  List,
  Datagrid,
  TextField,
  NumberField,
  ShowButton,
  ReferenceField,
  DateTimeInput,
  BooleanInput,
  ReferenceInput,
  SelectInput,
} from "react-admin";
import Actions from "../../reactAdmin/components/Actions";

// ------------------------------------------------
const scanFilters = [
  <DateTimeInput label="from" source="createdAt.gte" />,
  <DateTimeInput label="to" source="createdAt.lte" />,
  <BooleanInput label="success" source="success" />,
  <ReferenceInput
    source="compoundId"
    reference="compound"
    label={"compound"}
    name={"compoundId"}
  >
    <SelectInput optionText={"name"} />
  </ReferenceInput>,
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
