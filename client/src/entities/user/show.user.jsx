import {
  Show,
  SimpleShowLayout,
  TextField,
  NumberField,
  BooleanField,
  ImageField,
  ReferenceManyField,
  Datagrid,
  ReferenceField,
  EditButton,
  FunctionField,
  useTranslate,
  WrapperField,
} from "react-admin";
import UserTitle from "./title";
import ActionsShowUser from "./actions.show.user";
import Actions from "../../reactAdmin/components/Actions";
import UserType from "../../components/UserType";

// ------------------------------------------------
export default function ShowUser(props) {
  return (
    <Show title={<UserTitle />} actions={<ActionsShowUser />}>
      <SimpleShowLayout>
        <NumberField variant="outlined" source="id" />
        <TextField variant="outlined" source="email" />
        <TextField variant="outlined" source="name" />
        <WrapperField label={"type"}>
          <UserType />
        </WrapperField>
        <ImageField source="photoUrl" title="photo" />
        <BooleanField variant="outlined" source="active" />
        <TextField variant="outlined" source="phone" />
        <ReferenceManyField
          label="properties"
          reference="userCompound"
          target="userId"
          link="show"
        >
          <Datagrid>
            <ReferenceField
              source="compoundId"
              reference="compound"
              link="show"
            >
              <TextField source="name" />
            </ReferenceField>
            <TextField variant="outlined" source="streetName" />
            <NumberField variant="outlined" source={"blockNumber"} />
            <NumberField variant="outlined" source={"unitNumber"} />
            <Actions label="">
              <EditButton label="ra.action.edit" />
            </Actions>
          </Datagrid>
        </ReferenceManyField>
      </SimpleShowLayout>
    </Show>
  );
}
