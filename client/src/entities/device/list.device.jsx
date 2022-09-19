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

export default function ListDevice(props) {
  return (
    <List>
      <Datagrid>
        <NumberField variant="outlined" source="id" />
        <TextField variant="outlined" source="ip" />
        <NumberField variant="outlined" source="compoundId" />

        <Actions label="">
          <ShowButton label="ra.action.show" />
          <EditButton label="ra.action.edit" />
          <DeleteButton label="ra.action.delete" />
        </Actions>
      </Datagrid>
    </List>
  );
}
