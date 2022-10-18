import {
  AutocompleteInput,
  Datagrid,
  DeleteButton,
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
import dateFormatter from "../../utils/dateFormatter";
const requestFilters = [
  <SearchInput source="q" alwaysOn />,
  <ReferenceInput
    source="compoundId"
    reference="compound"
    label={"compound"}
    name={"compoundId"}
  >
    <AutocompleteInput />
  </ReferenceInput>,
  <ReferenceInput
    source="userId"
    reference="user"
    label={"user"}
    name={"userId"}
  >
    <AutocompleteInput />
  </ReferenceInput>,
];

export default function ListRequest(props) {
  const t = useTranslate();
  return (
    <List filters={requestFilters}>
      <Datagrid>
        <NumberField variant="outlined" source="id" />
        <FunctionField
          source={"type"}
          render={(rec) => `${t("facilityType." + rec.type)}`}
        />
        <ReferenceField source="facilityId" reference="facility" link="show">
          <TextField source="name" />
        </ReferenceField>
        <FunctionField
          source={"createdAt"}
          render={(rec) =>
            `${rec?.createdAt ? dateFormatter(rec.createdAt) : "-"}`
          }
        />
        <FunctionField
          source={"availableDateFrom"}
          render={(rec) =>
            `${
              rec?.availableDateFrom
                ? dateFormatter(rec.availableDateFrom)
                : "-"
            }`
          }
        />
        <FunctionField
          source={"availableDateTo"}
          render={(rec) =>
            `${rec?.availableDateTo ? dateFormatter(rec.availableDateTo) : "-"}`
          }
        />
        <TextField variant="outlined" source="requestNote" />
        <FunctionField
          source={"respondNote"}
          render={(rec) => `${rec?.respondNote ? rec.respondNote : "-"}`}
        />
        {/*Pending || Refused || InProgress || Completed*/}
        <FunctionField
          source={"status"}
          render={(rec) => `${t("status." + rec.status)}`}
        />
        <ReferenceField source="userId" reference="user" link="show">
          <TextField source="name" />
        </ReferenceField>
        <ReferenceField source="compoundId" reference="compound" link="show">
          <TextField source="name" />
        </ReferenceField>
        <Actions label="">
          <ShowButton label="ra.action.show" />
          <RespondButton />
          <DeleteButton label="ra.action.delete" />
        </Actions>
      </Datagrid>
    </List>
  );
}
