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
  ReferenceField,
  useTranslate,
} from "react-admin";
import Actions from "../../reactAdmin/components/Actions";

// ------------------------------------------------
const Title = () => {
  const translate = useTranslate();
  return <span>{translate("properties")}</span>;
};
export default function ListUserCompound(props) {
  return (
    <List title={<Title />}>
      <Datagrid>
        <NumberField variant="outlined" source="id" />

        <ReferenceField source="userId" reference="user">
          <TextField source="name" />
        </ReferenceField>
        <ReferenceField source="compoundId" reference="compound">
          <TextField source="name" />
        </ReferenceField>
        <TextField variant="outlined" source="streetName" />
        <NumberField variant="outlined" source={"blockNumber"} />
        <NumberField variant="outlined" source={"unitNumber"} />
        <Actions label="">
          <ShowButton label="ra.action.show" />
          <EditButton label="ra.action.edit" />
          <DeleteButton label="ra.action.delete" />
        </Actions>
      </Datagrid>
    </List>
  );
}
