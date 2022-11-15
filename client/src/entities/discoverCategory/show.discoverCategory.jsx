import {
  Show,
  SimpleShowLayout,
  TextField,
  ReferenceField,
  ImageField,
} from 'react-admin';
import DiscoverTitle from './title.discoverCategory';

// ------------------------------------------------

export default function ShowDiscoverCategory(props) {
  return (
    <Show title={<DiscoverTitle />}>
      <SimpleShowLayout>
        <TextField variant="outlined" source="name" />
        <TextField variant="outlined" source="description" multiline />
        <ImageField source="photoUrl" title="title" />
        <ReferenceField
          source="compoundId"
          reference="compound"
          label="compound"
          link="show"
        >
          <TextField source="name" />
        </ReferenceField>
        <ReferenceField source="categoryId" reference="category" link="show">
          <TextField source="name" />
        </ReferenceField>
      </SimpleShowLayout>
    </Show>
  );
}
