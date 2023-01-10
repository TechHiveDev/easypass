import {
  List,
  Datagrid,
  TextField,
  NumberField,
  ShowButton,
  ReferenceField,
  DateTimeInput,
  BooleanInput,
  ReferenceInput,
  WrapperField,
  useRecordContext,
  AutocompleteInput,
  BooleanField,
  FunctionField,
} from "react-admin";
import Actions from "../../reactAdmin/components/Actions";
import UserType from "../../components/UserType";
import { dateFormatter } from "../../utils/dateFormatter";

// ------------------------------------------------

const scanFilters = [
  <DateTimeInput label="from" source="createdAt.gte" />,
  <DateTimeInput label="to" source="createdAt.lte" />,
  <BooleanInput label="success" source="success" />,
  <ReferenceInput
    source="compoundId"
    reference="compound"
    label="compound"
    name="compoundId"
  >
    <AutocompleteInput label="compound" optionText="name" />
  </ReferenceInput>,
  <ReferenceInput label="user" source="userId" reference="user">
    <AutocompleteInput label="user" optionText="name" />
  </ReferenceInput>,
];

// ------------------------------------------------

const CustomInvitation: any = () => {
  const record = useRecordContext();
  if (record.type === "Resident") return "-";
  return <TextField source="invitationId" />;
};

// ------------------------------------------------

export default function ListScan(_props: any) {
  return (
    <List filters={scanFilters}>
      <Datagrid>
        <NumberField source="id" />
        <WrapperField label="invitation">
          <CustomInvitation />
        </WrapperField>
        <TextField source="deviceId" />
        <ReferenceField
          source="userId"
          reference="user"
          label="user"
          link="show"
        >
          <TextField source="name" />
        </ReferenceField>
        <BooleanField source="success" />
        <ReferenceField source="compoundId" reference="compound" link="show">
          <TextField source="name" />
        </ReferenceField>
        <WrapperField label="type">
          <UserType />
        </WrapperField>
        <FunctionField
          source="createdAt"
          render={(rec: any) => dateFormatter(rec.createdAt)}
        />
        <Actions label="">
          <ShowButton label="ra.action.show" />
        </Actions>
      </Datagrid>
    </List>
  );
}
