import {
  List,
  Datagrid,
  TextField,
  NumberField,
  ShowButton,
  EditButton,
  DeleteButton,
  ReferenceField,
} from "react-admin";
import Actions from "../../reactAdmin/components/Actions";

// ------------------------------------------------

export default function ListDevice(_props: any) {
  return (
    <List>
      <Datagrid>
        <NumberField source="id" />
        <TextField source="ip" />
        <ReferenceField source="compoundId" reference="compound" link="show">
          <TextField source="name" />
        </ReferenceField>
        <Actions label="">
          <ShowButton label="ra.action.show" />
          <EditButton label="ra.action.edit" />
          <DeleteButton label="ra.action.delete" />
        </Actions>
      </Datagrid>
    </List>
  );
}
