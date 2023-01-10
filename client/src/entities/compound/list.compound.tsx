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

// ------------------------------------------------

export default function ListCompound(props: any) {
  const { isLoading, permissions } = usePermissions();
  return (
    <List filters={compoundFilters}>
      <Datagrid>
        <NumberField source="id" />
        <TextField source="name" />
        <TextField source="location" />
        <div style={{ display: "flex" }}>
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
