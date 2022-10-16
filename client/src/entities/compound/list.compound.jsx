import {
  List,
  Datagrid,
  TextField,
  NumberField,
  ShowButton,
  EditButton,
  DeleteButton,
  usePermissions,
  ImageField,
  SearchInput,
} from "react-admin";
import Actions from "../../reactAdmin/components/Actions";

// ------------------------------------------------
const compoundFilters = [<SearchInput source="q" alwaysOn />];

export default function ListCompound(props) {
  const { isLoading, permissions } = usePermissions();
  return (
    <List filters={compoundFilters}>
      <Datagrid>
        <NumberField variant="outlined" source="id" />
        <TextField variant="outlined" source="name" />
        <TextField variant="outlined" source="location" />
        <div
          style={{
            display: "flex",
          }}
        >
          <ShowButton label="ra.action.show" />
          {!isLoading && permissions === "SuperAdmin" ? (
            <>
              <EditButton label="ra.action.edit" />
              <DeleteButton label="ra.action.delete" />
            </>
          ) : null}
        </div>
      </Datagrid>
    </List>
  );
}
