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
} from "react-admin";
import Actions from "../../reactAdmin/components/Actions";

// ------------------------------------------------

export default function ListScan(props) {
  return (
    <List>
      <Datagrid>
        <NumberField variant="outlined" source="id" />
        <NumberField variant="outlined" source="invitationId" />

        <NumberField variant="outlined" source="deviceId" />

        <Actions label="">
          <ShowButton label="show" />
          <EditButton label="edit" />
          <DeleteButton label="delete" />
        </Actions>
      </Datagrid>
    </List>
  );
}
