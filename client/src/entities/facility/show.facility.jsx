import {
  Show,
  SimpleShowLayout,
  TextField,
  NumberField,
  BooleanField,
  DateField,
  ReferenceField, TextInput,
  ReferenceInput,
  SelectInput,
  ImageField, ArrayInput, SimpleFormIterator, DateTimeInput, BooleanInput, ArrayField, Datagrid,
} from "react-admin";
import Title from "./title.facility";

// ------------------------------------------------

export default function ShowFacility(props) {
  return (
    <Show title={<Title />}>
      <SimpleShowLayout>
        <TextField variant="outlined" source="name" />
        <TextField variant="outlined" source="description" multiline={true} />
        <TextField variant="outlined" source="price"/>
        <TextField variant="outlined" source="icon"/>
        <ReferenceField
          source="compoundId"
          reference="compound"
          label="compound"
          link="show"
        >
          <TextField source="name" />
        </ReferenceField>
        <ArrayField source="slots">
          <Datagrid>
            <TextField source="from" helperText={false} />
            <TextField source="to" helperText={false} />
            <BooleanField source="available" helperText={false} />
          </Datagrid>
        </ArrayField>
      </SimpleShowLayout>
    </Show>
  );
}
