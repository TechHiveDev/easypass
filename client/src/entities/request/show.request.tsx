import {
  FunctionField,
  NumberField,
  ReferenceField,
  Show,
  SimpleShowLayout,
  TextField,
  useTranslate,
} from "react-admin";
import Title from "./title.request";
// import { RespondButton } from "./RespondButton.request";
// import { SeenButton } from "./SeenButton.request";
import { dateFormatter } from "../../utils/dateFormatter";

// ------------------------------------------------

export default function ShowRequest(props: any) {
  const t = useTranslate();
  return (
    <Show
      title={<Title />}
      // actions={[<RespondButton />, <SeenButton />]}
    >
      <SimpleShowLayout>
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
            `${
              rec?.availableDateFrom
                ? dateFormatter(rec.availableDateFrom)
                : "-"
            }`
          }
        />
        <FunctionField
          source="availableDateTo"
          render={(rec: any) =>
            `${rec?.availableDateTo ? dateFormatter(rec.availableDateTo) : "-"}`
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
          &nbsp;-&nbsp;
          <TextField source="blockNumber" />
          &nbsp;-&nbsp;
          <TextField source="unitNumber" />
        </ReferenceField>
      </SimpleShowLayout>
    </Show>
  );
}
