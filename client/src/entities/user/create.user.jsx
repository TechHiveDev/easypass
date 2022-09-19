import { Create, SimpleForm, SelectInput, TextInput } from "react-admin";
// ------------------------------------------------
const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = "The Email is required";
  }
  if (!values.name) {
    errors.name = "The name is required";
  }
  if (!values.password) {
    errors.password = "The password is required";
  }
  if (!values.phone) {
    errors.phone = "The phone is required";
  }
  if (!values.type) {
    errors.type = "The type is required";
  }
  return errors;
};
export default function CreateUser(props) {
  return (
    <Create
      resource={"oauth/register"}
      redirect={"/user"}
      title={"Create user"}
    >
      <SimpleForm validate={validate}>
        <TextInput variant="outlined" source="email" required />
        <TextInput variant="outlined" source="name" required />
        <TextInput variant="outlined" source="password" required />
        <TextInput variant="outlined" source="photoUrl" />
        <TextInput variant="outlined" source="phone" required />
        <SelectInput
          source="type"
          required
          choices={[
            { id: "Security", name: "Security" },
            { id: "Resident", name: " Resident" },
          ]}
        />
      </SimpleForm>
    </Create>
  );
}
