import {
  AutocompleteInput,
  Datagrid,
  FunctionField,
  List,
  NumberField,
  ReferenceField,
  ReferenceInput,
  SearchInput,
  ShowButton,
  TextField,
  useTranslate,
} from 'react-admin';
import Actions from '../../reactAdmin/components/Actions';
import { RespondButton } from './RespondButton.request';
import dateFormatter, { daysMergerWithTime } from '../../utils/dateFormatter';

const requestFilters = [
  <SearchInput source="q" alwaysOn />,
  <ReferenceInput
    source="compoundId"
    reference="compound"
    label="compound"
    name="compoundId"
  >
    <AutocompleteInput optionText="name" />
  </ReferenceInput>,
  <ReferenceInput source="userId" reference="user" label="user" name="userId">
    <AutocompleteInput optionText="name" />
  </ReferenceInput>,
];
export default function ListRequest(props) {
  const t = useTranslate();
  return (
    <List filters={requestFilters}>
      <Datagrid>
        <NumberField variant="outlined" source="id" />
        <FunctionField
          source="type"
          render={(rec) => `${t(`facilityType.${rec.type}`)}`}
        />
        <ReferenceField source="facilityId" reference="facility" link="show">
          <TextField source="name" />
        </ReferenceField>
        <FunctionField
          source="createdAt"
          render={(rec) =>
            `${rec?.createdAt ? dateFormatter(rec.createdAt) : '-'}`
          }
        />
        <FunctionField
          source="availableDateFrom"
          render={(rec) =>
            daysMergerWithTime(rec?.availableDateFrom, rec.availableDateTo)
          }
        />
        <FunctionField
          source="respondNote"
          render={(rec) =>
            `${rec?.respondNote ? rec.respondNote.split('#ST#')[1] : '-'}`
          }
        />
        <FunctionField
          source="status"
          render={(rec) => `${t(`status.${rec.status}`)}`}
        />
        <ReferenceField source="userId" reference="user" link="show">
          <TextField source="name" />
        </ReferenceField>
        <ReferenceField source="compoundId" reference="compound" link="show">
          <TextField source="name" />
        </ReferenceField>
        <ReferenceField
          source="userCompoundId"
          reference="userCompound"
          link="show"
          label={t('streetBlockUnit')}
        >
          <TextField source="streetName" />
          - <TextField source="blockNumber" />
          - <TextField source="unitNumber" />
        </ReferenceField>
        <Actions label="">
          <ShowButton label="ra.action.show" />
          <RespondButton />
        </Actions>
      </Datagrid>
    </List>
  );
}
