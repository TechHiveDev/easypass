import {
  Edit,
  SimpleForm,
  TextInput,
  ReferenceInput,
  SelectInput,
  useTranslate,
} from "react-admin";
import InvitationTitle from "./title.invitation";

// ------------------------------------------------

export default function EditInvitation(props) {
  const t = useTranslate();
  return (
    <Edit title={<InvitationTitle />}>
      <SimpleForm redirect="list">
        <TextInput variant="outlined" source="name" />
        <SelectInput
          required
          name={"type"}
          source={"type"}
          choices={[
            { id: "Visitor", name: t("userType." + "Visitor") },
            { id: "Delivery", name: t("userType." + "Delivery") },
          ]}
        />
        <TextInput variant="outlined" source="notes" />
        <ReferenceInput
          source="compoundId"
          reference="compound"
          label={"compound"}
          name={"compoundId"}
        >
          <SelectInput optionText={"name"} />
        </ReferenceInput>
        <ReferenceInput
          source="userId"
          reference="user"
          label={"user"}
          name={"user"}
        >
          <SelectInput optionText={"name"} />
        </ReferenceInput>
      </SimpleForm>
    </Edit>
  );
}
