import {
  Create,
  SimpleForm,
  SelectInput,
  TextInput,
  BooleanInput,
  usePermissions,
} from "react-admin";
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
  const { isLoading, permissions } = usePermissions();
  return (
    <Create
      resource={"oauth/register"}
      redirect={"/user"}
      title={"Create user"}
    >
      {isLoading ? (
        <h3>Loading</h3>
      ) : (
        <SimpleForm validate={validate}>
          <TextInput variant="outlined" source="email" required />
          <TextInput variant="outlined" source="name" required />
          <TextInput variant="outlined" source="password" required />
          <TextInput variant="outlined" source="photoUrl" />
          <TextInput variant="outlined" source="phone" required />
          <BooleanInput variant={"outlined"} source={"active"} />
          <SelectInput
            source="type"
            required
            choices={
              permissions === "SuperAdmin"
                ? [
                    { id: "SuperAdmin", name: "SuperAdmin" },
                    { id: "Admin", name: "Admin" },
                    { id: "Resident", name: "Resident" },
                    { id: "Security", name: "Security" },
                  ]
                : [
                    { id: "Resident", name: "Resident" },
                    { id: "Security", name: "Security" },
                  ]
            }
          />
        </SimpleForm>
      )}
    </Create>
  );
}
