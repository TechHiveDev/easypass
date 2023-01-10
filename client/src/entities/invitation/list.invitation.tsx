import {
  List,
  Datagrid,
  TextField,
  NumberField,
  FunctionField,
  ShowButton,
  EditButton,
  DeleteButton,
  ReferenceField,
  DateTimeInput,
  TextInput,
  ReferenceInput,
  SelectInput,
  AutocompleteInput,
  WrapperField,
} from "react-admin";
import Actions from "../../reactAdmin/components/Actions";
import UserType from "../../components/UserType";
import dateFormatter from "../../utils/dateFormatter";

// ------------------------------------------------
const inviteFilters = [
  <DateTimeInput label="from" source="createdAt.gte" />,
  <DateTimeInput label="to" source="createdAt.lte" />,
  // @ts-ignore
  <TextInput />,
  <SelectInput
    label="type"
    source="type"
    choices={[
      { id: "Delivery", name: "Delivery" },
      { id: "Visitor", name: "Visitor" },
    ]}
  />,
  <ReferenceInput
    source="compoundId"
    reference="compound"
    label="compound"
    name="compoundId"
  >
    <AutocompleteInput label="compound" optionText="name" />
  </ReferenceInput>,
  <ReferenceInput label="user" source="userId" reference="user">
    <AutocompleteInput label="user" optionText="name" />
  </ReferenceInput>,
];
export default function ListInvitation(props) {
  return (
    <List filters={inviteFilters}>
      <Datagrid>
        <NumberField variant="outlined" source="id" />
        <TextField variant="outlined" source="name" />
        <WrapperField label="type">
          <UserType />
        </WrapperField>
        <TextField variant="outlined" source="notes" />
        <ReferenceField source="userId" reference="user" link="show">
          <TextField source="name" />
        </ReferenceField>
        <ReferenceField source="compoundId" reference="compound" link="show">
          <TextField source="name" />
        </ReferenceField>
        <FunctionField
          source="createdAt"
          render={(rec) => dateFormatter(rec.createdAt)}
        />
        <Actions label="">
          <ShowButton label="ra.action.show" />
          <EditButton label="ra.action.edit" />
          <DeleteButton label="ra.action.delete" />
        </Actions>
      </Datagrid>
    </List>
  );
}
