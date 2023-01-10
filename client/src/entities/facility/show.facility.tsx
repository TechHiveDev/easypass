import {
  Show,
  SimpleShowLayout,
  TextField,
  BooleanField,
  ReferenceField,
  ArrayField,
  Datagrid,
  FunctionField,
} from "react-admin";
import Title from "./title.facility";
import { daysMergerWithTime } from "../../utils/dateFormatter";

// ------------------------------------------------

export default function ShowFacility() {
  return (
    <Show title={<Title />}>
      <SimpleShowLayout>
        <TextField source="name" />
        <TextField source="description" />
        <TextField source="price" />
        <TextField source="icon" />
        <ReferenceField
          source="compoundId"
          reference="compound"
          label="compound"
          link="show"
        >
          <TextField source="name" />
        </ReferenceField>
        <ArrayField source="slots">
          <Datagrid>
            <FunctionField
              source="time"
              render={(rec: any) => daysMergerWithTime(rec?.from, rec.to)}
            />
            <BooleanField source="available" />
          </Datagrid>
        </ArrayField>
      </SimpleShowLayout>
    </Show>
  );
}
