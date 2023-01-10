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
  useTranslate,
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
// ------------------------------------------------
const userFilters = [<SearchInput source="q" alwaysOn />];
const ActiveButton = () => {
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
      })
  );
  return (
    <Button
      sx={{
        opacity: active ? 0 : 1,
        pointerEvents: active ? "none" : null,
      }}
      startIcon={<AddTaskIcon />}
      disabled={isLoading}
      onClick={async () => {
        const res = await mutateAsync({ ...record, active: true });
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
};
export default function ListUser(props) {
  return (
    <List filters={userFilters}>
      <Datagrid>
        <NumberField variant="outlined" source="id" />
        <TextField variant="outlined" source="email" />
        <TextField variant="outlined" source="name" />
        <TextField variant="outlined" source="phone" />
        <BooleanField variant="outlined" source="active" />
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
