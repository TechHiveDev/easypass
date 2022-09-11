import {
  Show,
  SimpleShowLayout,
  TextField,
  NumberField,
  BooleanField,
  DateField,
} from "react-admin";

// ------------------------------------------------

export default function ShowUserCompound(props) {
  return (
    <Show>
      <SimpleShowLayout>
        <NumberField variant="outlined" source="id" />
        <NumberField variant="outlined" source="userId" />

        <NumberField variant="outlined" source="compoundId" />
      </SimpleShowLayout>
    </Show>
  );
}
