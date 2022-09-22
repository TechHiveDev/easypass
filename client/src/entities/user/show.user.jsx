import {
  Show,
  SimpleShowLayout,
  TextField,
  NumberField,
  BooleanField,
} from "react-admin";

// ------------------------------------------------

export default function ShowUser(props) {
  return (
    <Show>
      <SimpleShowLayout>
        <NumberField variant="outlined" source="id" />
        <TextField variant="outlined" source="email" />
        <TextField variant="outlined" source="name" />
        <TextField variant="outlined" source="type" />
        {/*<TextField variant="outlined" source="password" />*/}
        <TextField variant="outlined" source="photoUrl" />
        <BooleanField variant="outlined" source="active" />
        <TextField variant="outlined" source="phone" />
      </SimpleShowLayout>
    </Show>
  );
}
