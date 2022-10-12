import {
  Create,
  SimpleForm,
  SelectInput,
  NumberInput,
  TextInput,
  BooleanInput,
  usePermissions,
  ReferenceInput,
  ImageInput,
  ImageField,
} from "react-admin";
import Title from "./title";
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
      title={<Title create={true} />}
    >
      {isLoading ? (
        <h3>Loading</h3>
      ) : (
        <SimpleForm validate={validate}>
          <TextInput variant="outlined" source="email" required />
          <TextInput variant="outlined" source="name" required />
          <TextInput variant="outlined" source="password" required />
          <ImageInput source="photoUrl" label="logo" accept="image/*">
            <ImageField source="src" title="title" />
          </ImageInput>
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
          <ReferenceInput
            source="compoundId"
            reference="compound"
            label={"compound"}
            name={"compoundId"}
          >
            <SelectInput optionText={"name"} />
          </ReferenceInput>
          <TextInput variant="outlined" source="streetName" required />
          <NumberInput variant="outlined" source={"blockNumber"} required />
          <NumberInput variant="outlined" source={"unitNumber"} required />
        </SimpleForm>
      )}
    </Create>
  );
}
