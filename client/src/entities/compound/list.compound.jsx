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

export default function ListCompound(props) {
  return (
    <List>
      <Datagrid>
        <NumberField variant="outlined" source="id" />
        <TextField variant="outlined" source="name" />
        <TextField variant="outlined" source="logoUrl" />
        <TextField variant="outlined" source="location" />

        <Actions label="">
          <ShowButton label="ra.action.show" />
          <EditButton label="ra.action.edit" />
          <DeleteButton label="ra.action.delete" />
        </Actions>
      </Datagrid>
    </List>
  );
}
