import {
  Edit,
  SimpleForm,
  TextInput,
  BooleanInput,
  SelectInput,
  usePermissions,
  ImageInput,
  ImageField,
  useTranslate,
} from "react-admin";
import UserTitle from "./title.user";
import PreviewImage from "../../components/PreviewImage";

// ------------------------------------------------

export default function EditUser(props) {
  const { isLoading, permissions } = usePermissions();
  const t = useTranslate();
  return (
    <Edit title={<UserTitle />}>
      {isLoading ? (
        <h3>Loading</h3>
      ) : (
        <SimpleForm redirect="list">
          {/*<NumberInput variant="outlined" source="id" />*/}
          <TextInput variant="outlined" source="email" />
          <TextInput variant="outlined" source="name" />
          {/*<TextInput variant="outlined" source="password" />*/}
          <BooleanInput name={"active"} source={"active"} />
          <ImageInput source="photoUrl" accept="image/*">
            <PreviewImage source="src" />
          </ImageInput>
          <TextInput variant="outlined" source="phone" />
          <SelectInput
            required
            name={"type"}
            source={"type"}
            choices={
              permissions === "SuperAdmin"
                ? [
                    { id: "SuperAdmin", name: t("userType." + "SuperAdmin") },
                    { id: "Admin", name: t("userType." + "Admin") },
                    { id: "Resident", name: t("userType." + "Resident") },
                    { id: "Security", name: t("userType." + "Security") },
                  ]
                : [
                    { id: "Resident", name: t("userType." + "Resident") },
                    { id: "Security", name: t("userType." + "Security") },
                  ]
            }
          />
        </SimpleForm>
      )}
    </Edit>
  );
}
