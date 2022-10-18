import {
  Show,
  SimpleShowLayout,
  TextField,
  NumberField,
  BooleanField,
  DateField,
  ReferenceField,
  WrapperField,
  FunctionField,
} from "react-admin";
import InvitationTitle from "./title.invitation";
import UserType from "../../components/UserType";
import dateFormatter from "../../utils/dateFormatter";

// ------------------------------------------------

export default function ShowInvitation(props) {
  return (
    <Show title={<InvitationTitle />}>
      <SimpleShowLayout>
        <NumberField variant="outlined" source="id" />
        <TextField variant="outlined" source="name" />
        <WrapperField label={"type"}>
          <UserType />
        </WrapperField>
        <TextField variant="outlined" source="notes" />
        <ReferenceField source="userId" reference="user" link="show">
          <TextField source="name" />
        </ReferenceField>
        <ReferenceField source="compoundId" reference="compound" link="show">
          <TextField source="name" />
        </ReferenceField>
        <FunctionField
          source={"createdAt"}
          render={(rec) => dateFormatter(rec.createdAt)}
        />
      </SimpleShowLayout>
    </Show>
  );
}
