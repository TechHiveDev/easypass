import {
  Show,
  SimpleShowLayout,
  TextField,
  BooleanField,
  ReferenceField,
  ArrayField,
  Datagrid,
  FunctionField,
} from 'react-admin';
import Title from './title.facility';
import { daysMergerWithTime } from '../../utils/dateFormatter';

// ------------------------------------------------

export default function ShowFacility() {
  return (
    <Show title={<Title />}>
      <SimpleShowLayout>
        <TextField variant="outlined" source="name" />
        <TextField variant="outlined" source="description" multiline />
        <TextField variant="outlined" source="price" />
        <TextField variant="outlined" source="icon" />
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
            <FunctionField
              source="time"
              render={(rec) => daysMergerWithTime(rec?.from, rec.to)}
            />
            <BooleanField source="available" helperText={false} />
          </Datagrid>
        </ArrayField>
      </SimpleShowLayout>
    </Show>
  );
}
