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

export default function ListUserCompound(props) {
  return (
    <List>
      <Datagrid>
        <NumberField variant="outlined" source="id" />
        <NumberField variant="outlined" source="userId" />

        <NumberField variant="outlined" source="compoundId" />

        <Actions label="">
          <ShowButton label="show" />
          <EditButton label="edit" />
          <DeleteButton label="delete" />
        </Actions>
      </Datagrid>
    </List>
  );
}
