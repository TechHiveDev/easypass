import {
  Show,
  SimpleShowLayout,
  TextField,
  NumberField,
  ReferenceField,
  BooleanField,
  WrapperField,
  FunctionField,
} from "react-admin";
import DeviceTitle from "./title.scan";
import UserType from "../../components/UserType";
import dateFormatter from "../../utils/dateFormatter";

// ------------------------------------------------

export default function ShowScan(props) {
  return (
    <Show title={<DeviceTitle />}>
      <SimpleShowLayout>
        <NumberField variant="outlined" source="id" />
        <TextField variant="outlined" source="invitationId" />
        <TextField variant="outlined" source="deviceId" />
        <BooleanField variant="outlined" source="success" />
        <ReferenceField source="compoundId" reference="compound" link="show">
          <TextField source="name" />
        </ReferenceField>
        <WrapperField label={"type"}>
          <UserType />
        </WrapperField>
        <FunctionField
          source={"createdAt"}
          render={(rec) => dateFormatter(rec.createdAt)}
        />
      </SimpleShowLayout>
    </Show>
  );
}
