import {
  Show,
  SimpleShowLayout,
  TextField,
  NumberField,
  ReferenceField,
  FunctionField,
  useTranslate,
} from "react-admin";
import Title from "./title.request";
import { RespondButton } from "./RespondButton.request";
import dateFormatter from "../../utils/dateFormatter";

// ------------------------------------------------

export default function ShowRequest(props) {
  const t = useTranslate();
  return (
    <Show title={<Title />} actions={[<RespondButton />]}>
      <SimpleShowLayout>
        <NumberField variant="outlined" source="id" />
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
      </SimpleShowLayout>
    </Show>
  );
}
