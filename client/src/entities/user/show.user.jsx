import {
  Show,
  SimpleShowLayout,
  TextField,
  NumberField,
  BooleanField,
  DateField,
} from "react-admin";

// ------------------------------------------------

export default function ShowUser(props) {
  return (
    <Show>
      <SimpleShowLayout>
        <NumberField variant="outlined" source="id" />
        <TextField variant="outlined" source="email" />
        <TextField variant="outlined" source="name" />
        {/*<TextField variant="outlined" source="password" />*/}
        <TextField variant="outlined" source="photoUrl" />
        <TextField variant="outlined" source="phone" />
      </SimpleShowLayout>
    </Show>
  );
}
