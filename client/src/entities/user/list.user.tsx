import {
  List,
  Datagrid,
  TextField,
  NumberField,
  BooleanField,
  ShowButton,
  EditButton,
  DeleteButton,
  SearchInput,
  WrapperField,
  useRecordContext,
  useLocaleState,
  useDataProvider,
  useRefresh,
} from "react-admin";
import Actions from "../../reactAdmin/components/Actions";
import UserType from "../../components/UserType";
import { useMutation } from "react-query";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import AddTaskIcon from "@mui/icons-material/AddTask";

// =================================================================

const userFilters = [<SearchInput source="q" alwaysOn />];

// =================================================================

function ActiveButton() {
  const refresh = useRefresh();
  const [locale] = useLocaleState();
  const { active } = useRecordContext();
  const record = useRecordContext();
  const dataProvider = useDataProvider();
  const { mutateAsync, isLoading } = useMutation(
    ["user", "update", { id: record.id }],
    () =>
      dataProvider.update("user", {
        id: record.id,
        data: { ...record, active: true },
      } as any)
  );

  // ------------------------------------------------

  return (
    <Button
      sx={{
        opacity: active ? 0 : 1,
        pointerEvents: active ? "none" : null,
      }}
      startIcon={<AddTaskIcon />}
      disabled={isLoading}
      onClick={async () => {
        const res: any = await mutateAsync({ ...record, active: true } as any);
        if (res?.data?.id) {
          refresh();
        }
      }}
    >
      {isLoading ? (
        <CircularProgress />
      ) : (
        ` ${locale === "ar" ? "فعل" : "activate"} `
      )}
    </Button>
  );
}

// =================================================================

export default function ListUser(_props: any) {
  return (
    <List filters={userFilters}>
      <Datagrid>
        <NumberField source="id" />
        <TextField source="email" />
        <TextField source="name" />
        <TextField source="phone" />
        <BooleanField source="active" />
        <WrapperField label={"type"}>
          <UserType />
        </WrapperField>
        <Actions label="">
          <ShowButton label="ra.action.show" />
          <EditButton label="ra.action.edit" />
          <DeleteButton label="ra.action.delete" />
          <ActiveButton />
        </Actions>
      </Datagrid>
    </List>
  );
}
