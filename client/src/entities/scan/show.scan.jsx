import {
  Show,
  SimpleShowLayout,
  TextField,
  NumberField,
  ReferenceField,
  BooleanField,
  WrapperField,
} from "react-admin";
import DeviceTitle from "./title";
import UserType from "../../components/UserType";

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
        <TextField variant="outlined" source="createdAt" />
      </SimpleShowLayout>
    </Show>
  );
}
