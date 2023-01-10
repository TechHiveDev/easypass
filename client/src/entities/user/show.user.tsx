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
import { RespondButton } from "../request/RespondButton.request";
import { dateFormatter } from "../../utils/dateFormatter";

// ------------------------------------------------
export default function ShowUser(props: any) {
  const t = useTranslate();
  return (
    <Show title={<UserTitle />} actions={<ActionsShowUser />}>
      <SimpleShowLayout>
        <NumberField source="id" />
        <TextField source="email" />
        <TextField source="name" />
        <WrapperField label={"type"}>
          <UserType />
        </WrapperField>
        <ImageField source="photoUrl" title="photo" />
        <BooleanField source="active" />
        <TextField source="phone" />
        <ReferenceManyField
          label="properties"
          reference="userCompound"
          target="userId"
          // link="show"
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
            <TextField source="streetName" />
            <NumberField source={"blockNumber"} />
            <NumberField source={"unitNumber"} />
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
          // link="show"
          pagination={<Pagination />}
          perPage={10}
        >
          <Datagrid>
            <FunctionField
              source={"type"}
              render={(rec: any) => `${t("facilityType." + rec.type)}`}
            />
            <FunctionField
              source={"createdAt"}
              render={(rec: any) =>
                `${rec?.createdAt ? dateFormatter(rec.createdAt) : "-"}`
              }
            />
            <FunctionField
              source={"availableDateFrom"}
              render={(rec: any) =>
                `${
                  rec?.availableDateFrom
                    ? dateFormatter(rec.availableDateFrom)
                    : "-"
                }`
              }
            />
            <FunctionField
              source={"availableDateTo"}
              render={(rec: any) =>
                `${
                  rec?.availableDateTo
                    ? dateFormatter(rec.availableDateTo)
                    : "-"
                }`
              }
            />
            <TextField source="requestNote" />
            <FunctionField
              source={"respondNote"}
              render={(rec: any) =>
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
              render={(rec: any) => `${t("status." + rec.status)}`}
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
          // link="show"
        >
          <Datagrid>
            <TextField source="name" />
            <WrapperField label={"type"}>
              <UserType />
            </WrapperField>
            <TextField source="notes" />
            <ReferenceField
              source="compoundId"
              reference="compound"
              link="show"
            >
              <TextField source="name" />
            </ReferenceField>
            <FunctionField
              source={"createdAt"}
              render={(rec: any) => dateFormatter(rec.createdAt)}
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
          // link="show"
          pagination={<Pagination />}
          perPage={10}
        >
          <Datagrid>
            <TextField source="deviceId" />
            <BooleanField source="success" />
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
              render={(rec: any) => dateFormatter(rec.createdAt)}
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
