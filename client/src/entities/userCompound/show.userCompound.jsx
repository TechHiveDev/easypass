import {
  Show,
  SimpleShowLayout,
  TextField,
  NumberField,
  BooleanField,
  DateField,
  useRecordContext,
} from "react-admin";
import UserCompoundTitle from "./title";

// ------------------------------------------------

export default function ShowUserCompound(props) {
  return (
    <Show title={<UserCompoundTitle />}>
      <SimpleShowLayout>
        <NumberField variant="outlined" source="id" />
        <NumberField variant="outlined" source="userId" />

        <NumberField variant="outlined" source="compoundId" />
      </SimpleShowLayout>
    </Show>
  );
}
