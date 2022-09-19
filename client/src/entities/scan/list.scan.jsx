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
          <ShowButton label="ra.action.show" />
          <EditButton label="ra.action.edit" />
          <DeleteButton label="ra.action.delete" />
        </Actions>
      </Datagrid>
    </List>
  );
}
