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
import Title from "./title.user";
// ------------------------------------------------

export default function CreateUser(props: any) {
  const t = useTranslate();
  const { isLoading, permissions } = usePermissions();
  return (
    <Create resource="oauth/register" redirect="/user" title={<Title create />}>
      {isLoading ? (
        <h3>Loading</h3>
      ) : (
        <SimpleForm
        // validate={(v) => validate(v)}
        >
          <TextInput variant="outlined" source="email" isRequired={true} />
          <TextInput variant="outlined" source="name" isRequired={true} />
          <TextInput variant="outlined" source="password" isRequired={true} />
          <ImageInput source="photoUrl" accept="image/*">
            <ImageField source="src" title="title" />
          </ImageInput>
          <TextInput variant="outlined" source="phone" isRequired={true} />
          <BooleanInput variant="outlined" source="active" />
          <SelectInput
            isRequired={true}
            name="type"
            source="type"
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
            isRequired={true}
            source="compoundId"
            reference="compound"
            label="compound"
            name="compoundId"
          >
            <AutocompleteInput
              optionText="name"
              label="compound"
              isRequired={true}
              validate={(v) => {
                if (v === "") return t("isRequired={true}Compound");
                return undefined;
              }}
            />
          </ReferenceInput>
          <TextInput variant="outlined" source="streetName" isRequired={true} />
          <NumberInput
            variant="outlined"
            source="blockNumber"
            isRequired={true}
          />
          <NumberInput
            variant="outlined"
            source="unitNumber"
            isRequired={true}
          />
        </SimpleForm>
      )}
    </Create>
  );
}
