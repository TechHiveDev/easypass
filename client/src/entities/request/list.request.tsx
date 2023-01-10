import {
  AutocompleteInput,
  Datagrid,
  FunctionField,
  List,
  NumberField,
  ReferenceField,
  ReferenceInput,
  SearchInput,
  ShowButton,
  TextField,
  useTranslate,
} from "react-admin";
import Actions from "../../reactAdmin/components/Actions";
import { RespondButton } from "./RespondButton.request";
import { SeenButton } from "./SeenButton.request";
import { dateFormatter, daysMergerWithTime } from "../../utils/dateFormatter";

// =================================================================

const requestFilters = [
  <SearchInput source="q" alwaysOn />,
  <ReferenceInput
    source="compoundId"
    reference="compound"
    label="compound"
    name="compoundId"
  >
    <AutocompleteInput optionText="name" />
  </ReferenceInput>,
  <ReferenceInput source="userId" reference="user" label="user" name="userId">
    <AutocompleteInput optionText="name" />
  </ReferenceInput>,
];

// =================================================================

const requestRowStyle = (record: any, index: any) => ({
  backgroundColor: record.adminSeen === false ? "rgba(0,140,255,0.09)" : null,
});

// =================================================================

export default function ListRequest(props: any) {
  const t = useTranslate();
  return (
    <List filters={requestFilters}>
      <Datagrid rowStyle={requestRowStyle}>
        <NumberField source="id" />
        <FunctionField
          source="type"
          render={(rec: any) => `${t(`facilityType.${rec.type}`)}`}
        />
        <ReferenceField source="facilityId" reference="facility" link="show">
          <TextField source="name" />
        </ReferenceField>
        <FunctionField
          source="createdAt"
          render={(rec: any) =>
            `${rec?.createdAt ? dateFormatter(rec.createdAt) : "-"}`
          }
        />
        <FunctionField
          source="availableDateFrom"
          render={(rec: any) =>
            daysMergerWithTime(rec?.availableDateFrom, rec.availableDateTo)
          }
        />
        <FunctionField
          source="respondNote"
          render={(rec: any) =>
            `${rec?.respondNote ? rec.respondNote.split("#ST#")[1] : "-"}`
          }
        />
        <FunctionField
          source="status"
          render={(rec: any) => `${t(`status.${rec.status}`)}`}
        />
        {/* <BooleanField source="adminSeen" /> */}
        <ReferenceField source="userId" reference="user" link="show">
          <TextField source="name" />
        </ReferenceField>
        <ReferenceField source="compoundId" reference="compound" link="show">
          <TextField source="name" />
        </ReferenceField>
        <ReferenceField
          source="userCompoundId"
          reference="userCompound"
          link="show"
          label={t("streetBlockUnit")}
        >
          <TextField source="streetName" />
          - <TextField source="blockNumber" />
          - <TextField source="unitNumber" />
        </ReferenceField>
        <Actions label="">
          <ShowButton label="ra.action.show" />
          <RespondButton />
          <SeenButton />
        </Actions>
      </Datagrid>
    </List>
  );
}
