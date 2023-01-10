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
import { dateFormatter } from "../../utils/dateFormatter";

// ------------------------------------------------

export default function ShowScan(props: any) {
  return (
    <Show title={<DeviceTitle />}>
      <SimpleShowLayout>
        <NumberField source="id" />
        <TextField source="invitationId" />
        <TextField source="deviceId" />
        <BooleanField source="success" />
        <ReferenceField source="compoundId" reference="compound" link="show">
          <TextField source="name" />
        </ReferenceField>
        <WrapperField label={"type"}>
          <UserType />
        </WrapperField>
        <FunctionField
          source={"createdAt"}
          render={(rec: any) => dateFormatter(rec.createdAt)}
        />
      </SimpleShowLayout>
    </Show>
  );
}
