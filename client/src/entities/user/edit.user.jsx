import { Edit, SimpleForm, TextInput, BooleanInput } from "react-admin";

// ------------------------------------------------

export default function EditUser(props) {
  return (
    <Edit {...props}>
      <SimpleForm redirect="list">
        {/*<NumberInput variant="outlined" source="id" />*/}
        <TextInput variant="outlined" source="email" />
        <TextInput variant="outlined" source="name" />
        {/*<TextInput variant="outlined" source="password" />*/}
        <BooleanInput name={"active"} source={"active"} />
        <TextInput variant="outlined" source="photoUrl" />
        <TextInput variant="outlined" source="phone" />
        <TextInput variant="outlined" source="docs" />
      </SimpleForm>
    </Edit>
  );
}
