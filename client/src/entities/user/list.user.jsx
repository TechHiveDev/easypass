import {
  List,
  Datagrid,
  TextField,
  NumberField,
  BooleanField,
  ShowButton,
  EditButton,
  DeleteButton,
  ImageField,
} from "react-admin";
import Actions from "../../reactAdmin/components/Actions";

// ------------------------------------------------

export default function ListUser(props) {
  return (
    <List>
      <Datagrid>
        <NumberField variant="outlined" source="id" />
        <TextField variant="outlined" source="email" />
        <TextField variant="outlined" source="name" />
        {/*<TextField variant="outlined" source="password" />*/}
        {/*<TextField variant="outlined" source="photoUrl" />*/}
        {/*<ImageField source="photoUrl" title="photo" />*/}
        <TextField variant="outlined" source="phone" />
        <BooleanField variant="outlined" source="active" />
        <TextField variant="outlined" source="type" />

        <Actions label="">
          <ShowButton label="ra.action.show" />
          <EditButton label="ra.action.edit" />
          <DeleteButton label="ra.action.delete" />
        </Actions>
      </Datagrid>
    </List>
  );
}
