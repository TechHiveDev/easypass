import {
  Show,
  SimpleShowLayout,
  TextField,
  NumberField,
  ReferenceField,
  WrapperField,
  FunctionField,
} from "react-admin";
import InvitationTitle from "./title.invitation";
import UserType from "../../components/UserType";
import { dateFormatter } from "../../utils/dateFormatter";

// ------------------------------------------------

export default function ShowInvitation(_props: any) {
  return (
    <Show title={<InvitationTitle />}>
      <SimpleShowLayout>
        <NumberField source="id" />
        <TextField source="name" />
        <WrapperField label={"type"}>
          <UserType />
        </WrapperField>
        <TextField source="notes" />
        <ReferenceField source="userId" reference="user" link="show">
          <TextField source="name" />
        </ReferenceField>
        <ReferenceField source="compoundId" reference="compound" link="show">
          <TextField source="name" />
        </ReferenceField>
        <FunctionField
          source={"createdAt"}
          render={(rec: any) => dateFormatter(rec.createdAt)}
        />
      </SimpleShowLayout>
    </Show>
  );
}
