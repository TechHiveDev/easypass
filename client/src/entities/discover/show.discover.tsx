import {
  Show,
  SimpleShowLayout,
  TextField,
  ReferenceField,
  ImageField,
  NumberField,
  FunctionField,
} from 'react-admin';
import DiscoverTitle from './title.discover';
import { timeMerger } from '../../utils/dateFormatter';

// ------------------------------------------------

export default function ShowDiscover(props) {
  return (
    <Show title={<DiscoverTitle />}>
      <SimpleShowLayout>
        <NumberField variant="outlined" source="id" />
        <TextField variant="outlined" source="name" />
        <TextField variant="outlined" source="shortDescription" />
        <TextField variant="outlined" source="description" />
        <ImageField variant="outlined" source="photoUrl" />
        <TextField variant="outlined" source="phone" />
        <TextField variant="outlined" source="address" />
        <FunctionField
          variant="outlined"
          source="openFromTo"
          render={(r) => timeMerger(r.openDateFrom, r.openDateTo)}
        />
        <ReferenceField source="compoundId" reference="compound" link="show">
          <TextField source="name" />
        </ReferenceField>
        <ReferenceField source="categoryId" reference="category" link="show">
          <TextField source="name" />
        </ReferenceField>
      </SimpleShowLayout>
    </Show>
  );
}
