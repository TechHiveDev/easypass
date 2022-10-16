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
  useTranslate,
  AutocompleteInput,
} from "react-admin";
import Title from "./title";
// ------------------------------------------------

export default function CreateUser(props) {
  const t = useTranslate();
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
        <SimpleForm
        // validate={(v) => validate(v)}
        >
          <TextInput variant="outlined" source="email" required />
          <TextInput variant="outlined" source="name" required />
          <TextInput variant="outlined" source="password" required />
          <ImageInput source="photoUrl" accept="image/*">
            <ImageField source="src" title="title" />
          </ImageInput>
          <TextInput variant="outlined" source="phone" required />
          <BooleanInput variant={"outlined"} source={"active"} />
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
          <ReferenceInput
            required
            source="compoundId"
            reference="compound"
            label={"compound"}
            name={"compoundId"}
          >
            <AutocompleteInput
              label="compound"
              required
              validate={(v) => {
                if (v === "") return t("requiredCompound");
                return undefined;
              }}
            />
          </ReferenceInput>
          <TextInput variant="outlined" source="streetName" required />
          <NumberInput variant="outlined" source={"blockNumber"} required />
          <NumberInput variant="outlined" source={"unitNumber"} required />
        </SimpleForm>
      )}
    </Create>
  );
}
