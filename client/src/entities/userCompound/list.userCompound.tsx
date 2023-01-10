import {
  List,
  Datagrid,
  TextField,
  NumberField,
  ShowButton,
  EditButton,
  DeleteButton,
  ReferenceField,
  useTranslate,
  ReferenceInput,
  AutocompleteInput,
} from "react-admin";
import Actions from "../../reactAdmin/components/Actions";

// =================================================================

const Title = () => {
  const translate = useTranslate();
  return <span>{translate("properties")}</span>;
};

// =================================================================

const userCompoundFilters = [
  <ReferenceInput
    source="compoundId"
    reference="compound"
    label="compound"
    name="compoundId"
  >
    <AutocompleteInput label="compound" optionText="name" />
  </ReferenceInput>,
  <ReferenceInput label="user" source="userId" reference="user">
    <AutocompleteInput label="user" optionText="name" />
  </ReferenceInput>,
];

// =================================================================

export default function ListUserCompound(props: any) {
  return (
    <List title={<Title />} filters={userCompoundFilters}>
      <Datagrid>
        <NumberField source="id" />
        <ReferenceField source="userId" reference="user" link="show">
          <TextField source="name" />
        </ReferenceField>
        <ReferenceField source="compoundId" reference="compound" link="show">
          <TextField source="name" />
        </ReferenceField>
        <TextField source="streetName" />
        <NumberField source="blockNumber" />
        <NumberField source="unitNumber" />
        <Actions label="">
          <ShowButton label="ra.action.show" />
          <EditButton label="ra.action.edit" />
          <DeleteButton label="ra.action.delete" />
        </Actions>
      </Datagrid>
    </List>
  );
}