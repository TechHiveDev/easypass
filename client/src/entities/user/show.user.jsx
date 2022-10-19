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
  Pagination,
  ShowButton,
} from "react-admin";
import UserTitle from "./title.user";
import ActionsShowUser from "./actions.show.user";
import Actions from "../../reactAdmin/components/Actions";
import UserType from "../../components/UserType";
import dateFormatter from "../../utils/dateFormatter";
import { RespondButton } from "../request/RespondButton.request";

// ------------------------------------------------
export default function ShowUser(props) {
  const t = useTranslate();
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
          pagination={<Pagination />}
          perPage={10}
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
              <ShowButton label="ra.action.show" />
              <EditButton label="ra.action.edit" />
            </Actions>
          </Datagrid>
        </ReferenceManyField>
        <ReferenceManyField
          label="menu.Request"
          reference="request"
          target="userId"
          link="show"
          pagination={<Pagination />}
          perPage={10}
        >
          <Datagrid>
            <FunctionField
              source={"type"}
              render={(rec) => `${t("facilityType." + rec.type)}`}
            />
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
                `${
                  rec?.availableDateTo
                    ? dateFormatter(rec.availableDateTo)
                    : "-"
                }`
              }
            />
            <TextField variant="outlined" source="requestNote" />
            <FunctionField
              source={"respondNote"}
              render={(rec) =>
                `${
                  rec?.respondNote
                    ? rec.respondNote.length > 40
                      ? rec.respondNote.substring(0, 40) + "...."
                      : rec.respondNote
                    : "-"
                }`
              }
            />
            {/*Pending || Refused || InProgress || Completed*/}
            <FunctionField
              source={"status"}
              render={(rec) => `${t("status." + rec.status)}`}
            />
            <ReferenceField
              source="compoundId"
              reference="compound"
              link="show"
            >
              <TextField source="name" />
            </ReferenceField>
            <ReferenceField
              source="userCompoundId"
              reference="userCompound"
              link="show"
              label={t("streetBlockUnit")}
            >
              <TextField source="streetName" />
              &nbsp;-&nbsp;
              <TextField source="blockNumber" />
              &nbsp;-&nbsp;
              <TextField source="unitNumber" />
            </ReferenceField>
            <Actions label="">
              <ShowButton label="ra.action.show" />
              <RespondButton />
            </Actions>
          </Datagrid>
        </ReferenceManyField>{" "}
        <ReferenceManyField
          pagination={<Pagination />}
          perPage={10}
          label="menu.Invitation"
          reference="invitation"
          target="userId"
          link="show"
        >
          <Datagrid>
            <TextField variant="outlined" source="name" />
            <WrapperField label={"type"}>
              <UserType />
            </WrapperField>
            <TextField variant="outlined" source="notes" />
            <ReferenceField
              source="compoundId"
              reference="compound"
              link="show"
            >
              <TextField source="name" />
            </ReferenceField>
            <FunctionField
              source={"createdAt"}
              render={(rec) => dateFormatter(rec.createdAt)}
            />
            <Actions label={""}>
              <ShowButton label="ra.action.show" />
            </Actions>
          </Datagrid>
        </ReferenceManyField>{" "}
        <ReferenceManyField
          label="menu.Scan"
          reference="scan"
          target="userId"
          link="show"
          pagination={<Pagination />}
          perPage={10}
        >
          <Datagrid>
            <TextField variant="outlined" source="deviceId" />
            <BooleanField variant="outlined" source="success" />
            <ReferenceField
              source="compoundId"
              reference="compound"
              link="show"
            >
              <TextField source="name" />
            </ReferenceField>
            <WrapperField label={"type"}>
              <UserType />
            </WrapperField>
            <FunctionField
              source={"createdAt"}
              render={(rec) => dateFormatter(rec.createdAt)}
            />
            <Actions label={""}>
              <ShowButton label="ra.action.show" />
            </Actions>
          </Datagrid>
        </ReferenceManyField>
      </SimpleShowLayout>
    </Show>
  );
}
