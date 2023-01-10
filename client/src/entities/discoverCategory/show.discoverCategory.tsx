import {
  Show,
  SimpleShowLayout,
  TextField,
  ReferenceField,
  ImageField,
  NumberField,
} from 'react-admin';
import DiscoverTitle from './title.discoverCategory';

// ------------------------------------------------

export default function ShowDiscoverCategory(props) {
  return (
    <Show title={<DiscoverTitle />}>
      <SimpleShowLayout>
        <NumberField variant="outlined" source="id" />
        <TextField variant="outlined" source="name" />
        <TextField variant="outlined" source="description" />
        <TextField variant="outlined" source="icon" />
      </SimpleShowLayout>
    </Show>
  );
}
