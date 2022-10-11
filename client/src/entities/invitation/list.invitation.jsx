import {
  List,
  Datagrid,
  TextField,
  NumberField,
  BooleanField,
  DateField,
  ShowButton,
  EditButton,
  DeleteButton,
  ReferenceField,
  DateTimeInput,
  TextInput,
  ReferenceInput,
  SelectInput,
} from "react-admin";
import Actions from "../../reactAdmin/components/Actions";

// ------------------------------------------------
const inviteFilters = [
  <DateTimeInput label="from" source="createdAt.gte" />,
  <DateTimeInput label="to" source="createdAt.lte" />,
  <TextInput label="type" source="type" />,
  <ReferenceInput
    source="compoundId"
    reference="compound"
    label={"compound"}
    name={"compoundId"}
  >
    <SelectInput optionText={"name"} />
  </ReferenceInput>,
];
export default function ListInvitation(props) {
  return (
    <List filters={inviteFilters}>
      <Datagrid>
        <NumberField variant="outlined" source="id" />
        <TextField variant="outlined" source="name" />

        <TextField variant="outlined" source="type" />
        <TextField variant="outlined" source="notes" />
        <ReferenceField source="userId" reference="user">
          <TextField source="name" />
        </ReferenceField>
        <ReferenceField source="compoundId" reference="compound">
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
