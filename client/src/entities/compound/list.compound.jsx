import {
  List,
  Datagrid,
  TextField,
  NumberField,
  ShowButton,
  EditButton,
  DeleteButton,
  usePermissions,
} from "react-admin";
import Actions from "../../reactAdmin/components/Actions";

// ------------------------------------------------

export default function ListCompound(props) {
  const { isLoading, permissions } = usePermissions();
  return (
    <List>
      <Datagrid>
        <NumberField variant="outlined" source="id" />
        <TextField variant="outlined" source="name" />
        <TextField variant="outlined" source="logoUrl" />
        <TextField variant="outlined" source="location" />
        {isLoading ? (
          <h3>Loading</h3>
        ) : (
          <Actions label="">
            <ShowButton label="ra.action.show" />
            {permissions === "SuperAdmin" ? (
              <>
                <EditButton label="ra.action.edit" />
                <DeleteButton label="ra.action.delete" />
              </>
            ) : null}
          </Actions>
        )}
      </Datagrid>
    </List>
  );
}
